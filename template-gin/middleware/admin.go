package middleware

import (
	"fleme/global"
	"fleme/model"
	"fleme/util"
	"net/http"

	"github.com/gin-contrib/sessions"
	"github.com/gin-gonic/gin"
)

func notAdmin(c *gin.Context) {
	util.Response(c, http.StatusUnauthorized, 401, nil, "fail")
	c.Abort()
}

func isAdmin(role int) bool {
	return role == 1
}

func Admin() gin.HandlerFunc {
	return func(c *gin.Context) {
		session := sessions.Default(c)
		userId := session.Get("userId")

		if userId == nil {
			notAdmin(c)
			return
		}

		var user model.User
		global.DB.First(&user, userId)

		if user.ID <= 0 {
			notAdmin(c)
			return
		}

		if !isAdmin(user.Role) {
			notAdmin(c)
			return
		}

		c.Next()
	}
}
