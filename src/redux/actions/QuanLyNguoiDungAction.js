import { history } from "../../App";
import { quanLyNguoiDungService } from "../../services/QuanLyNguoiDungService";
import { quanLyPhimService } from "../../services/QuanLyPhimService";
import { DANG_NHAP_ACTION,SET_THONG_TIN_NGUOI_DUNG } from "./types/QuanLyNguoiDungType";
import { SET_DANH_SACH_PHIM } from "./types/QuanLyPhimType";




export const dangNhapAction = (thongTinDangNhap) => {
    return async (dispatch) => {
        try {
            //Sử dụng tham số thamSo
            const result = await quanLyNguoiDungService.dangNhap(thongTinDangNhap);
            console.log('result', result)
            //Sau khi lấy dữ liệu từ api về => redux (reducer)
            if (result.data.statusCode === 200) {
                dispatch({
                    type: DANG_NHAP_ACTION,
                    thongTinDangNhap: result.data.content
                });
                //Chuyển hướng đăng nhập về trang trước đó
                history.goBack();
            }
        } catch (errors) {
            console.log('errors', errors.response.data);
        }
    };
}


export const layThongTinNguoiDungAction = () => {
    return async (dispatch) => {
        try {
            //Sử dụng tham số thamSo
            const result = await quanLyNguoiDungService.layThongTinNguoiDung();
            console.log('result', result)
            //Sau khi lấy dữ liệu từ api về => redux (reducer)
            if (result.data.statusCode === 200) {
                dispatch({
                    type: SET_THONG_TIN_NGUOI_DUNG,
                    thongTinNguoiDung: result.data.content
                });
            }
        } catch (errors) {
            console.log('errors', errors.response.data);
        }
    };
}