package model

type User struct {
	Base
	Username string `gorm:"column:username;type: varchar(20); not null;" json:"username"`
	Password string `gorm:"column:password;type: varchar(256); not null" json:"-"`
	Role     int    `gorm:"column:role;default(0)" json:"role"`
}
