package controller

import (
	"fleme/global"
	"fleme/model"
	"fleme/util"

	"github.com/gin-gonic/gin"
)

func NoteAdd(c *gin.Context) {
	content := c.PostForm("content")
	tags := c.PostForm("tags")

	note := model.Note{Content: content, Tags: tags, UserId: c.GetUint("userId")}

	result := global.DB.Create(&note)

	if result.RowsAffected > 0 {
		var addedNote model.Note
		global.DB.First(&addedNote, note.ID)

		util.Success(c, gin.H{"model": addedNote}, "success")
	} else {
		util.Fail(c, nil, "fail")
	}
}

func checkDbNote(id string, c *gin.Context) bool {
	var passed = true
	var dbNote model.Note
	global.DB.First(&dbNote, id)

	if dbNote.ID <= 0 {
		util.Fail(c, nil, "用户不存在")
		passed = false
	}

	if dbNote.UserId != c.GetUint("userId") {
		util.Fail(c, nil, "只能查看自己的笔记")
		passed = false
	}
	return passed
}

func NoteDelete(c *gin.Context) {
	id := c.Param("id")

	if !checkDbNote(id, c) {
		return
	}

	result := global.DB.Delete(&model.Note{}, id)

	if result.RowsAffected > 0 {
		util.Success(c, nil, "success")
	} else {
		util.Fail(c, nil, "fail")
	}
}

func NoteUpdate(c *gin.Context) {
	id := c.PostForm("id")
	content := c.PostForm("content")
	tags := c.PostForm("tags")

	if !checkDbNote(id, c) {
		return
	}

	var dbNote model.Note
	global.DB.First(&dbNote, id)
	result := global.DB.Model(&dbNote).Updates(model.Note{Content: content, Tags: tags})

	if result.RowsAffected > 0 {
		util.Success(c, nil, "success")
	} else {
		util.Fail(c, nil, "fail")
	}
}

func NoteList(c *gin.Context) {
	var page model.Page
	if c.ShouldBindQuery(&page) != nil {
		return
	}

	if page.PageNum <= 0 {
		page.PageNum = 1
	}

	if page.PageSize <= 0 {
		page.PageSize = 2
	}

	userId := c.GetUint("userId")
	var notes []model.Note
	global.DB.Where("user_id = ?", userId).Order("created_at desc").Limit(page.PageSize).Offset((page.PageNum - 1) * page.PageSize).Find(&notes)

	var count int64
	global.DB.Model(&model.Note{}).Count(&count)
	total := int(count)

	pageTotal := total / page.PageSize
	if total%page.PageSize != 0 {
		pageTotal++
	}

	hasMore := page.PageNum < pageTotal

	util.Success(c, gin.H{
		"list":     notes,
		"has_more": hasMore,
	}, "success")
}

func NoteDetail(c *gin.Context) {
	id := c.Param("id")

	var note model.Note
	result := global.DB.First(&note, id)

	if result.RowsAffected > 0 {
		util.Success(c, gin.H{
			"model": note,
		}, "success")
	} else {
		util.Fail(c, nil, "fail")
	}
}
