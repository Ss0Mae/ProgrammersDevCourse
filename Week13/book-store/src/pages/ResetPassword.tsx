import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import { styled } from 'styled-components'
import { resetPassword, resetRequset, signup } from '../api/auth.api'
import Button from '../components/common/Button'
import InputText from '../components/common/inputText'
import Title from '../components/common/Title'
import { useAlert } from '../hooks/useAlert'
import { SignupStyle } from './Signup'

export interface SignupProps {
    email: string;
    password: string;
}
const ResetPassword = () => {
    const navigate = useNavigate();
    const { showAlert } = useAlert();
    const [resetRequest, setResetRequest] = useState(false);

    const { register, handleSubmit, formState: { errors } } = useForm<SignupProps>();
    const onSubmit = (data: SignupProps) => {
        if (resetRequest) {
            resetPassword(data).then(() => {
                showAlert('비밀번호가 초기화되었습니다');
                navigate('/login');
            })
        } else {
            resetRequset(data).then(() => {
                setResetRequest(true);
            });
        }
    }
    return (
    <>
        <Title size = "large">비밀번호 초기화</Title>
        <SignupStyle>
            <form onSubmit={handleSubmit(onSubmit)}>
                <fieldset>
                        <InputText placeholder="이메일"
                            inputType="email"
                            {...register('email', {required: true})}
                        />
                        {errors.email && <p className='error-text'>이메일을 입력해주세요.</p>}
                </fieldset>
                {resetRequest &&(    
                    <fieldset>
                            <InputText placeholder="비밀번호"
                                inputType="password"
                                {...register('password', {required: true})}
                            />
                            {errors.password && <p className='error-text'>비밀번호를 입력해주세요.</p>}
                    </fieldset>
                )}
                <fieldset>
                    <Button type = 'submit' size='medium' scheme='primary'>
                            {resetRequest ? '비밀번호 초기화' : '초기화 요청'}
                    </Button>
                    </fieldset>
                    <div className='info'>
                        <Link to = "/reset">비밀번호 초기화</Link>
                    </div>
           </form>
        </SignupStyle>
    </>
  )
}

export default ResetPassword
