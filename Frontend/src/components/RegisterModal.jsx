import React, { useState, useEffect } from 'react'
import Modal from 'react-bootstrap/Modal'
import ModalBody from 'react-bootstrap/ModalBody'
import ModalHeader from 'react-bootstrap/ModalHeader'
import { useDispatch, useSelector } from 'react-redux'
import { setLoginModal } from '../redux/login-sign_modal/loginSlice'
import { removeSignModal } from '../redux/login-sign_modal/signSlice'
import Alert from 'react-bootstrap/Alert'
import Form from 'react-bootstrap/Form'
import axios from 'axios'
import MojoAuth from "mojoauth-web-sdk"
import { apiUrl } from '../utils/constant'

const RegisterModal = () => {
    const initialForm = {
        username: "",
        password: "",
        rpassword: "",
        customer_name: "",
        phone: "",
        role: "customer"
    }
    const apiKey = '0d41f9d7ec2e4cb69f51b0e3b37b809a';
    const apiURL = 'https://emailvalidation.abstractapi.com/v1/?api_key=' + apiKey
    const dispatch = useDispatch()
    const [RegisterForm, setRegisterForm] = useState(initialForm)
    const show = useSelector(state => state.signModal.value)
    const [alert, setAlert] = useState(null)
    const { username, password, rpassword, customer_name } = RegisterForm
    const [validated, setValidated] = useState(false);
    const [payload, setPayload] = React.useState(null)
    const gotoLogin = () => {
        dispatch(removeSignModal())
        dispatch(setLoginModal())
    }
    const onRegisterFormChange = e => {
        setRegisterForm({
            ...RegisterForm,
            [e.target.name]: e.target.value,

        })
    }
    const sendEmailValidationRequest = async (email) => {
        try {
            const response = await axios.get(apiURL + '&email=' + email).catch(data => data);
            if (response.data.is_valid_format.value)
                return response.data.is_smtp_valid.value
            return false

        } catch (error) {
            throw error;
        }
    }
    const handleValidateEmail = async (email) => {
        const isValid = await sendEmailValidationRequest(email);
        return isValid;
    }
    const checkPass = () => {
        if (password !== rpassword)
            return true
        return false
    }
    const handleSubmit = async (event) => {
        const form = event.currentTarget;
        event.preventDefault();
        event.stopPropagation();

        if (form.checkValidity() === false) {
            setValidated(true);
        }
        else if (checkPass()) {
            // check pass and rpass
            setAlert(<Alert variant='danger'>M???t kh???u v?? M???t kh???u l???p kh??ng tr??ng nhau! M???i nh???p l???i</Alert>)
        }
        else {
            try {
                const isValid = await sendEmailValidationRequest(RegisterForm.username)
               
                if (isValid) {
                    const rs = await axios.post(`${apiUrl}/user/sign-in`, RegisterForm)
                    if (rs.data) {
                        setAlert(<Alert variant='success'>T???o t??i kho???n th??nh c??ng!</Alert>)
                    }
                }
                else {
                    setAlert(<Alert variant='danger'>Email kh??ng h???p l???: ?????nh d???ng ho???c mail kh??ng t???n t???i!</Alert>)
                    setValidated(false)
                    return
                }

            }
            catch {
                setAlert(<Alert variant='danger'>????ng k?? th???t b???i! Email ???? ???????c ????ng k??.</Alert>)
                setValidated(false)
                return
            }
            setRegisterForm(initialForm)
            setValidated(false)
        }

    }


    useEffect(() => {
        setRegisterForm(initialForm)
        setValidated(false)
        setAlert(null)
    }, [show])
    useEffect(() => {
        setTimeout(() => {
            setAlert(null)
        }, 3500)
    }, [alert])
    return (
        <Modal
            show={show}
            onHide={() => dispatch(removeSignModal())}
            backdrop={"static"}
            aria-labelledby="example-custom-modal-styling-title"
        >
            <ModalHeader closeButton>
                <Modal.Title id="example-custom-modal-styling-title">
                    {/* Register Form */}
                </Modal.Title>
            </ModalHeader>
            <ModalBody>
                <div id="main-wrapper" className="container">
                    <div className="row justify-content-center">
                        <div className="col-xl-10">
                            <div className="card border-0">
                                <div className="card-body p-0">
                                    <div className="row no-gutters">
                                        <div className="col-lg-6">
                                            <div className="p-5">
                                                <div className="mb-3">
                                                    <h3 className="h4 font-weight-bold text-theme">????ng k??</h3>
                                                </div>
                                                <h6 className="h5 mb-0">Bi???u m???u ????ng k??.</h6>
                                                <p className="text-muted mt-2 mb-3">Xin vui l??ng ??i???n ?????y ????? th??ng tin.
                                                </p>
                                                <Form noValidate validated={validated} onSubmit={handleSubmit}>
                                                    <Form.Group >
                                                        <Form.Label>H??? v?? t??n</Form.Label>
                                                        <Form.Control
                                                            required
                                                            type="text"
                                                            placeholder=""
                                                            value={customer_name}
                                                            name="customer_name"
                                                            onChange={onRegisterFormChange}
                                                        />
                                                        <Form.Control.Feedback type="invalid">
                                                            Vui l??ng nh???p h??? t??n.
                                                        </Form.Control.Feedback>
                                                    </Form.Group>
                                                    <Form.Group >
                                                        <Form.Label>Email</Form.Label>
                                                        <Form.Control
                                                            required
                                                            type="email"
                                                            placeholder=""
                                                            value={username}
                                                            name="username"
                                                            onChange={onRegisterFormChange}
                                                        />
                                                        <Form.Control.Feedback type="invalid">
                                                            Vui l??ng nh???p email.
                                                        </Form.Control.Feedback>
                                                    </Form.Group>
                                                    <Form.Group >
                                                        <Form.Label>M???t kh???u</Form.Label>
                                                        <Form.Control
                                                            required
                                                            type="password"
                                                            value={password}
                                                            name="password"
                                                            onChange={onRegisterFormChange}

                                                        />
                                                        <Form.Control.Feedback type="invalid">
                                                            Vui l??ng nh???p m???t kh???u.
                                                        </Form.Control.Feedback>
                                                    </Form.Group>
                                                    <Form.Group >
                                                        <Form.Label>L???p l???i M???t kh???u</Form.Label>
                                                        <Form.Control
                                                            required
                                                            type="password"
                                                            value={rpassword}
                                                            name="rpassword"
                                                            onChange={onRegisterFormChange}

                                                        />
                                                        <Form.Control.Feedback type="invalid">
                                                            Vui l??ng nh???p l???i m???t kh???u.
                                                        </Form.Control.Feedback>
                                                    </Form.Group>
                                                    {/* <MailValidation></MailValidation> */}
                                                    <div>
                                                        <button type="submit" className="btn btn-theme mb-3 mt-3">X??c nh???n ????ng k??</button>
                                                        {alert}
                                                    </div>

                                                </Form>
                                            </div>
                                        </div>
                                        <div className="col-lg-6 d-none d-lg-inline-block">
                                            <div className="account-block rounded-right">
                                                <div className="overlay rounded-right"></div>
                                                <div className="account-testimonial">
                                                    <h4 className="text-white mb-4">This beautiful theme yours!</h4>
                                                    <p className="lead text-white">"Ch??c qu?? kh??ch h??ng s??? c?? nh???ng tr???i nghi???m tuy???t v???i khi mua s???m ??? ????y."</p>
                                                    <p>- Admin</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                            </div>

                            <div className="text-muted text-center mt-3 mb-0 d-flex justify-content-center" >???? c?? t??i kho???n? &nbsp;<div
                                className="text-primary ml-1 modalmove" onClick={() => gotoLogin()}> ????ng nh???p</div></div>

                        </div>

                    </div>

                </div>
            </ModalBody>
        </Modal>
    )
}

export default RegisterModal