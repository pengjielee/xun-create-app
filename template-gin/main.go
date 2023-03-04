package main

import (
	"fleme/controller"
	"fleme/global"
	"fleme/initialize"
	"fleme/middleware"
	"fleme/model"

	"github.com/gin-contrib/sessions"
	"github.com/gin-contrib/sessions/cookie"
	"github.com/gin-gonic/gin"
)

func main() {
	global.DB = initialize.InitDB()
	// Migrate the schema
	global.DB.AutoMigrate(&model.User{})
	global.DB.AutoMigrate(&model.Note{})

	router := gin.Default()

	store := cookie.NewStore([]byte("secret11111"))

	router.Use(sessions.Sessions("my_token", store))

	v1 := router.Group("/v1")
	{
		user := v1.Group("/user")
		user.Use(middleware.Auth(), middleware.Admin())
		user.POST("/add", controller.UserAdd)
		user.POST("/delete/:id", controller.UserDelete)
		user.POST("/update", controller.UserUpdate)
		user.GET("/list", controller.UserList)
		user.GET("/detail/:id", controller.UserDetail)

		note := v1.Group("/note")
		note.Use(middleware.Auth())
		note.POST("/add", controller.NoteAdd)
		note.POST("/delete/:id", controller.NoteDelete)
		note.POST("/update", controller.NoteUpdate)
		note.GET("/list", controller.NoteList)
		note.GET("/detail/:id", controller.NoteDetail)

		v1.POST("/login", controller.Login)
		v1.POST("/init", controller.Initialize)
		v1.GET("/ping", controller.Ping)
	}

	router.Run(":8000") // 监听并在 0.0.0.0:8000 上启动服务
}
