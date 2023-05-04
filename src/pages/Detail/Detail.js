import React from 'react'
import { Button, CustomCard } from '@tsamantanis/react-glassmorphism'
import '@tsamantanis/react-glassmorphism/dist/index.css'
import '../../assets/styles/circle.css'
import { Radio, Space, Tabs, Rate } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { layThongTinChiTietPhim } from '../../redux/actions/QuanLyRapActions';
import moment from 'moment';
import { NavLink } from 'react-router-dom';
const { TabPane } = Tabs


export default function Detail(props) {

    const { filmDetail } = useSelector(state => state.QuanLyPhimReducer);
    // console.log('filmDetail', filmDetail)
    const dispatch = useDispatch();
    useEffect(() => {
        //Lấy thông tin param từ url
        let { id } = props.match.params;

        dispatch(layThongTinChiTietPhim(id))
    }, [])

    return (
        <div style={{ backgroundSize: '100%', backgroundPosition: 'center center', backgroundImage: `url(${filmDetail.hinhAnh})`, minHeight: '100vh' }}>
            <CustomCard
                style={{ paddingTop: 150, minHeight: '100vh' }}
                effectColor="#fff" // required
                color="#fff" // default color is white
                blur={20} // default blur value is 10px
                borderRadius={0} // default border radius value is 10px
            >
                <div className='grid grid-cols-12'>
                    <div className='col-span-5 col-start-3'>
                        <div className='grid grid-cols-2'>
                            <img className='' src={filmDetail.hinhAnh} alt='1' />
                            <div>
                                <p className='text-sm'>Ngày chiếu {moment(filmDetail.ngayKhoiChieu).format('DD.MM.YYYY')}</p>
                                <p className='text-4xl'>{filmDetail.tenPhim}</p>
                                <p>Mô tả {filmDetail.moTa}</p>
                            </div>
                        </div>
                    </div>
                    <div className='col-span-4'>
                        <h1 style={{ marginLeft: '15%', color: 'yellow', fontWeight: 'bold', fontSize: 15 }}>Đánh giá</h1>
                        <h1 style={{ marginLeft: '5%' }} className="text-green-400 text-2xl"><Rate allowHalf value={filmDetail.danhGia / 2} style={{ color: '#78ed78', fontSize: 30 }} /></h1>
                        <div className={`c100 p${filmDetail.danhGia * 10} big`}>
                            <span className="text-white">

                                {filmDetail.danhGia * 10}%
                            </span>
                            <div className="slice">
                                <div className="bar"></div>
                                <div className="fill"></div>

                            </div>

                        </div>
                    </div>
                </div>
                <div className='mt-10 ml-72 w-2/3 bg-white px-5 py-5 container'>
                    <Tabs defaultActiveKey='1' centered tabPosition={'left'}>
                        <TabPane tab="Lịch chiếu" key='1' style={{ minHeight: 300 }}>
                            <div>
                                <Tabs tabPosition='left'>
                                    {filmDetail.heThongRapChieu?.map((htr, index) => {
                                        return <TabPane
                                            tab={<div className='flex flex-row items-center justify-center'>
                                                <img src={htr.logo} className='rounded-full w-full' style={{ width: 50 }} alt={htr.logo} />
                                                <div className='text-center ml-2'>
                                                    {htr.tenHeThongRap}
                                                </div>
                                            </div>} key={index}>
                                            {htr.cumRapChieu?.map((cumRap, index) => {
                                                return <div className='mt-5' key={index}>
                                                    <div className='flex flex-row'>
                                                        <img style={{ width: 60, height: 60 }} src={cumRap.hinhAnh} />
                                                        <div className="ml-2">
                                                            <p style={{ fontSize: 20, fontWeight: 'bold', lineHeight: 1 }} >{cumRap.tenCumRap}</p>
                                                            <p className="text-gray-400" style={{ marginTop: 0 }}>{cumRap.diaChi}</p>
                                                        </div>
                                                    </div>
                                                    <div className="thong-tin-lich-chieu grid grid-cols-4">
                                                        {cumRap.lichChieuPhim?.slice(0, 12).map((lichChieu, index) => {
                                                            return <NavLink to={`/checkout/${lichChieu.maLichChieu}`} key={index} className="col-span-1 text-green-800 font-bold">
                                                                <p>{moment(lichChieu.ngayChieuGioChieu).format('DD.MM.YYYY')}</p>
                                                                {moment(lichChieu.ngayChieuGioChieu).format('hh:mm A')}
                                                            </NavLink>
                                                        })}
                                                    </div>
                                                </div>
                                            })}
                                        </TabPane>
                                    })}
                                </Tabs>
                            </div>
                        </TabPane>
                        <TabPane tab="Thông tin" key='2' style={{ minHeight: 300 }}>Thông</TabPane>
                        <TabPane tab="Đánh giá" key='3' style={{ minHeight: 300 }}>Đánh</TabPane>
                    </Tabs>
                </div>
            </CustomCard>
        </div>
    )
}
