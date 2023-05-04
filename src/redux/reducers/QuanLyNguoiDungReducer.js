import { TOKEN, USER_LOGIN } from "../../util/settings/config";
import { DANG_NHAP_ACTION, SET_THONG_TIN_NGUOI_DUNG } from "../actions/types/QuanLyNguoiDungType"

let user = {};
if (localStorage.getItem(USER_LOGIN)) {
    user = JSON.parse(localStorage.getItem(USER_LOGIN));
}

const initialState = {
    userLogin: user,
    thongTinNguoiDung: {}
}

export const QuanLyNguoiDungReducer = (state = initialState, action) => {
    switch (action.type) {

        case DANG_NHAP_ACTION: {
            state.userLogin = action.thongTinDangNhap;
            localStorage.setItem(USER_LOGIN, JSON.stringify(action.thongTinDangNhap));
            localStorage.setItem(TOKEN, action.thongTinDangNhap.accessToken);
            return { ...state, userLogin: action.thongTinDangNhap }
        }

        case SET_THONG_TIN_NGUOI_DUNG:{
            state.thongTinNguoiDung = action.thongTinNguoiDung;
            return {...state}; 
        }

        default:
            return { ...state }
    }
}
