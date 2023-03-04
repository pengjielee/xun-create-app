package controller

import (
	"fleme/global"
	"fleme/model"
	"fleme/util"
	"strconv"
	"strings"

	"github.com/gin-gonic/gin"
)

func isSystemUser(username string) bool {
	return username == "admin"
}

func UserAdd(c *gin.Context) {
	username := strings.ToLower(c.PostForm("username"))

	var dbUser model.User
	global.DB.Where("username = ?", username).First(&dbUser)

	if dbUser.Username != "" {
		util.Fail(c, nil, "用户名已存在")
		return
	}

	password := c.PostForm("password")
	hashedPassword, _ := util.HashAndSalt(password)

	result := global.DB.Create(&model.User{Username: username, Password: hashedPassword})

	if result.RowsAffected > 0 {
		util.Success(c, nil, "success")
	} else {
		util.Fail(c, nil, "fail")
	}
}

func UserDelete(c *gin.Context) {
	id := c.Param("id")

	var dbUser model.User
	global.DB.First(&dbUser, id)

	if isSystemUser(dbUser.Username) {
		util.Fail(c, nil, "系统用户不可删除")
		return
	}

	result := global.DB.Delete(&model.User{}, id)

	if result.RowsAffected > 0 {
		util.Success(c, nil, "success")
	} else {
		util.Fail(c, nil, "fail")
	}
}

func UserUpdate(c *gin.Context) {
	id := c.PostForm("id")
	var dbUser model.User
	global.DB.First(&dbUser, id)

	if isSystemUser(dbUser.Username) {
		util.Fail(c, nil, "系统用户不可编辑")
		return
	}

	username := c.PostForm("username")

	var dbUser2 model.User
	global.DB.Where("username = ? AND id != ?", username, id).First(&dbUser2)

	if dbUser2.Username != "" {
		util.Fail(c, nil, "用户名已存在")
		return
	}

	role, err := strconv.Atoi(c.PostForm("role"))

	if err != nil {
		role = 0
	}

	result := global.DB.Model(&dbUser).Updates(map[string]interface{}{
		"username": username,
		"role":     role,
	})

	if result.RowsAffected > 0 {
		util.Success(c, nil, "success")
	} else {
		util.Fail(c, nil, "fail")
	}
}

func UserList(c *gin.Context) {
	var users []model.User
	global.DB.Find(&users)

	util.Success(c, gin.H{
		"list": users,
	}, "success")
}

func UserDetail(c *gin.Context) {
	id := c.Param("id")

	var user model.User
	result := global.DB.First(&user, id)

	if result.RowsAffected > 0 {
		util.Success(c, gin.H{
			"model": user,
		}, "success")
	} else {
		util.Fail(c, nil, "fail")
	}
}
