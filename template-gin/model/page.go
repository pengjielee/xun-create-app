package model

type Page struct {
	PageNum  int `form:"page_num"`
	PageSize int `form:"page_size"`
}
