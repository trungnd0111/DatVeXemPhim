import { ThongTinDatVe } from "../_core/models/ThongTinDatVe";
import { baseService } from "./baseService";

export class QuanLyDatVeService extends baseService {

    constructor() {
        super();
    }

    layChiTietPhongVe = (maLichChieu) => { //maLichChieu lay tu url
        return this.get(`/api/QuanLyDatVe/LayDanhSachPhongVe?MaLichChieu=${maLichChieu}`);
    }

    datVe = (thongTinDatVe = new ThongTinDatVe()) => {
        return this.post(`/api/QuanLyDatVe/DatVe`, thongTinDatVe);
    }
}



export const quanLyDatVeService = new QuanLyDatVeService();
