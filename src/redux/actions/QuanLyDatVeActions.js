import { connection } from "../../index";
import { ThongTinDatVe } from "../../_core/models/ThongTinDatVe";
import { quanLyDatVeService } from "../../services/QuanLyDatVeService";
import { displayLoadingAction, hideLoadingAction } from "./LoadingActions";
import { DAT_VE, DAT_VE_HOAN_TAT, SET_CHI_TIET_PHONG_VE } from "./types/QuanLyPhongVeType";


export const layChiTietPhongVeAction = (maLichChieu) => {
    return async (dispatch) => {
        try {
            //Sử dụng tham số thamSo
            const result = await quanLyDatVeService.layChiTietPhongVe(maLichChieu);
            //Sau khi lấy dữ liệu từ api về => redux (reducer)
            if (result.status === 200) {
                dispatch({
                    type: SET_CHI_TIET_PHONG_VE,
                    chiTietPhongVe: result.data.content
                })
            }
        } catch (errors) {
            console.log('errors', errors.response?.data)
        }
    };
}


export const datVeAction = (thongTinDatVe = new ThongTinDatVe()) => {

    return async dispatch => {
        try {
            dispatch(displayLoadingAction)
            const result = await quanLyDatVeService.datVe(thongTinDatVe);
            console.log(result.data.content);
            //Đặt vé thành công gọi api load lại phòng vé
            await dispatch(layChiTietPhongVeAction(thongTinDatVe.maLichChieu));
            await dispatch({ type: DAT_VE_HOAN_TAT });
            await dispatch(hideLoadingAction);
        } catch (error) {
            dispatch(hideLoadingAction)
            console.log(error.response?.data);
        }
    }

}

export const datGheAction = (ghe,maLichChieu) => {
    return async (dispatch,getState) => {
        //Đưa thông tin ghế lên reducer
        await dispatch({
            type: DAT_VE,
            gheDuocChon: ghe
        });
        //Call api gọi về backend
        let danhSachGheDangDat = getState().QuanLyDatVeReducer.danhSachGheDangDat;
        let taiKhoan = getState().QuanLyNguoiDungReducer.userLogin.taiKhoan;

        console.log('danhSachGheDangDat', danhSachGheDangDat);
        console.log('taiKhoan', taiKhoan);
        console.log('maLichChieu', maLichChieu);
        //Biến mảng thành chuỗi
        danhSachGheDangDat = JSON.stringify(danhSachGheDangDat);

        //Call api signalR
        connection.invoke('datGhe', taiKhoan, danhSachGheDangDat, maLichChieu);

    }
}