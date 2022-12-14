import { color } from '@mui/system'
import React from 'react'
import { useParams } from 'react-router-dom'

const Policy = () => {
    let { policy } = useParams()

    return (
        <div>
            {
                policy === "doi-tra" ?
                    <div style={{color:"white"}}>
                        <h1>Chính sách đổi / trả hàng</h1>
                        <div >
                            <p><strong>I/ Quy Định Đổi Hàng.</strong></p>
                            <p><strong><em>Chính sách áp dụng:</em></strong> Áp dụng 01 lần đổi/01 đơn hàng.</p>
                            <p>- Sản phẩm nguyên giá được đổi sang sản phẩm nguyên giá khác còn hàng. Khách hàng thanh toán số tiền chênh lệch nếu giá trị sản phẩm đổi lớn hơn. Không hoàn trả lại tiền thừa dưới bất kỳ hình thức nào.</p><p>- Sản phẩm giảm giá đến 30% hoặc theo quy chế từng chương trình (nếu có) - Không hỗ trợ đổi sang sản phẩm khác.</p><p>- Sản phẩm chỉ được đổi một lần duy nhất.</p>
                            <p><strong><em>Điều kiện đổi sản phẩm:</em></strong></p><p>- Đổi hàng trong vòng 03 ngày kể từ ngày khách hàng nhận được sản phẩm</p><p>- Sản phẩm còn trong tình trạng ban đầu khi nhận hàng, còn nguyên tem và nhãn mác.</p>
                            <p><strong>II/ Quy Định Trả Hàng.</strong></p><p><strong><em>Chính sách áp dụng:</em></strong></p>
                            <p>- Khách hàng được trả sản phẩm trong trường hợp có lỗi phát sinh từ nhà sản xuất và không có nhu cầu đổi sang sản phẩm khác.</p><p>- Các trường hợp lỗi do nhà sản xuất gồm:&nbsp; dập, lỗi chất liệu,…</p><p>- Hoàn tiền lại sản phẩm gặp lỗi qua tài khoản ngân hàng.</p><p>- sunshine chịu 100% chi phí vận chuyển trả lại hàng.</p><p>- sunshine sẽ xử lý trong vòng 10 ngày kể từ ngày nhận được sản phẩm lỗi.</p><p><strong><em>Điều kiện trả sản phẩm</em></strong></p><p>&nbsp;&nbsp; Trả sản phẩm trong vòng 05 ngày kể từ ngày nhận sản phẩm.</p><p><strong><em>Chính sách hoàn tiền.</em></strong></p><p>- Đối với trường hợp thanh toán trước, khách hàng&nbsp;sẽ được hoàn tiền khi hàng nhận bị lỗi do sản xuất và khách hàng trả hàng không có nhu cầu đổi sang sản phẩm khác.</p><p>- Thời gian hoàn tiền: từ 07 đến 15 ngày kể từ khi Sunshine nhận được hàng trả từ khách hàng. Tiền được hoàn vào tài khoản cá nhân của khách hàng cung cấp.</p><p><strong>III/ Thực hiện đổi/ trả sản phẩm:</strong></p><p><strong><em>Đối với khách hàng mua hàng online.</em></strong></p><p>Bước 1: Liên hệ kênh bán hàng online đã đặt hàng để đăng ký đổi hàng.</p><p>Bước 2: Làm theo hướng dẫn của nhân viên tư vấn.</p><p>Bước 3: Đóng gói sản phẩm, quà khuyến mại (nếu có) kèm theo hoá đơn GTGT nếu có.</p><p>Bước 4: Gởi về địa chỉ 481 Tỉnh Lộ 10, phường Bình Trị Đông B ,quận Bình Tân, tp.Hồ Chí Minh. và chờ xác nhận từ bộ phận bán hàng online.</p><p style={{ textAlign: 'left' }}><strong>Số điện thoại liên hệ</strong><strong>: </strong><strong>0366330205</strong></p><p><strong><em>Đối với khách hàng mua hàng tại cửa hàng.</em></strong></p><p>Sản phẩm chỉ được đổi/trả tại cửa hàng khách hàng đã mua sản phẩm đó.</p>
                        </div>
                    </div>
                    :
                    policy === "bao-hanh" ?
                        <div style={{color:"white"}}>
                            <h1>Chính sách bảo hành</h1>
                            <div >
                                <p>&nbsp;</p><p style={{ marginBottom: '8px', textAlign: 'justify' }}><span style={{ fontSize: '11pt' }}><strong>1. </strong><strong>Quy định về bảo hành và sửa chữa sản phẩm:</strong></span></p><p style={{ marginBottom: '8px', textAlign: 'justify' }}><span style={{ fontSize: '11pt' }}>- Chỉ bảo hành/sửa chữa các sản phẩm được sản xuất và phân phối bởi Sunshine</span></p><p style={{ marginBottom: '8px', textAlign: 'justify' }}><span style={{ fontSize: '11pt' }}>- Chỉ bảo hành/sửa chữa 01 lần/01 sản phẩm trong thời hạn 06 tháng.</span></p><p style={{ marginBottom: '8px', textAlign: 'justify' }}><span style={{ fontSize: '11pt' }}>- Khi bảo hành/sửa chữa, khách hàng cần cung cấp đầy đủ Phiếu bảo hành (là hoá đơn bán hàng có thông tin và thời hạn bảo hành). Trong trường hợp không có phiếu bảo hành hoặc có nhưng hết hạn, xóa sửa, không còn nguyên vẹn, Sunshine sẽ từ chối bảo hành/sửa chữa sản phẩm.</span></p><p style={{ marginBottom: '8px', textAlign: 'justify' }}><span style={{ fontSize: '11pt' }}>- Không bảo hành/sửa chữa các sản phẩm bị hư hỏng do lỗi phát sinh trong quá trình sử dụng: trầy xước, rách do va chạm vật sắc nhọn, động vật cắn, sản phẩm hư hỏng do bảo quản không tốt dẫn đến ẩm mốc, phai nắng,...</span></p><p style={{ marginBottom: '8px', textAlign: 'justify' }}><span style={{ fontSize: '11pt' }}>- Không thay thế hoặc cấp lại phụ kiện đi kèm sản phẩm</span></p><p style={{ marginBottom: '8px', textAlign: 'justify' }}><span style={{ fontSize: '11pt' }}><span style={{ color: 'white' }}><strong>2. Thời gian bảo hành và sửa chữa: </strong>03 đến 15 ngày làm việc kể từ ngày Sunshine nhận được sản phẩm </span></span></p><p style={{ marginBottom: '8px', textAlign: 'justify' }}><span style={{ fontSize: '11pt' }}><span style={{ color: 'white' }}><strong>3.</strong><strong> </strong><strong>Địa chỉ nhận bảo hành</strong><strong> và sửa chữa</strong><strong>:</strong> Khách hàng vui lòng mang trực tiếp sản phẩm và phiếu bảo hành tới địa chỉ cửa hàng gần nhất của Sunshine để được phục vụ</span></span></p><p style={{ marginBottom: '8px', textAlign: 'justify' }}><span style={{ fontSize: '11pt' }}><span style={{ color: 'white' }}><strong><em>Lưu ý:</em></strong> Trong trường hợp xảy ra các tình huống phát sinh đặc biệt hoặc trường hợp có bất đồng, tranh cãi, Sunshine sẽ là người ra quyết định cuối cùng.</span></span></p><p>&nbsp;</p>
                            </div>
                        </div>
                        :
                        <div></div>


            }
        </div>

    )
}

export default Policy