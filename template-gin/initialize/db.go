package initialize

import (
	"fmt"
	"os"

	"gorm.io/driver/sqlite"
	"gorm.io/gorm"
)

func InitDB() *gorm.DB {
	wd, _ := os.Getwd()
	fmt.Println("工作目录: " + wd)
	db, err := gorm.Open(sqlite.Open(wd+"fleme.db"), &gorm.Config{})
	if err != nil {
		panic("failed to connect database")
	}
	return db
}
