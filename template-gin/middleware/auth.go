package middleware

import (
	"fleme/util"
	"net/http"

	"github.com/gin-contrib/sessions"
	"github.com/gin-gonic/gin"
)

func Auth() gin.HandlerFunc {
	return func(c *gin.Context) {
		session := sessions.Default(c)
		userId := session.Get("userId")
		if userId != nil {
			c.Set("userId", userId)
			c.Next()
		} else {
			util.Response(c, http.StatusUnauthorized, 401, nil, "fail")
			c.Abort()
		}
	}
}
