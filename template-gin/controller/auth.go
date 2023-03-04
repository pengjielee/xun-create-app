package controller

import (
	"fleme/global"
	"fleme/model"
	"fleme/util"
	"log"
	"strings"

	"github.com/gin-contrib/sessions"
	"github.com/gin-gonic/gin"
)

func Login(c *gin.Context) {
	username := strings.ToLower(c.PostForm("username"))
	password := c.PostForm("password")

	var user model.User
	global.DB.Where("username = ?", username).First(&user)

	if user.ID <= 0 {
		util.Fail(c, nil, "用户不存在")
		return
	}

	log.Println(user.Password)
	log.Println(password)
	log.Println(util.ComparePassword(user.Password, password))

	if util.ComparePassword(user.Password, password) {
		util.Fail(c, nil, "用户名或密码错误")
		return
	}

	session := sessions.Default(c)
	session.Set("userId", user.ID)
	session.Save()

	util.Success(c, nil, "登录成功")
}

func Initialize(c *gin.Context) {
	password := c.PostForm("password")

	if password == "" {
		util.Fail(c, nil, "密码为空")
		return
	}

	const ADMIN = "admin"

	var user model.User
	global.DB.Where("username = ?", ADMIN).First(&user)

	hashedPassword, _ := util.HashAndSalt(password)

	if user.ID > 0 {
		// result := global.DB.Model(&user).Update("password", hashedPassword)

		// if result.RowsAffected > 0 {
		// 	util.Success(c, nil, "success")
		// } else {
		// 	util.Fail(c, nil, "fail")
		// }
		util.Success(c, nil, "初始化已完成")
	} else {
		result := global.DB.Create(&model.User{Username: ADMIN, Password: hashedPassword, Role: 1})
		if result.RowsAffected > 0 {
			util.Success(c, nil, "success")
		} else {
			util.Fail(c, nil, "fail")
		}
	}

}
