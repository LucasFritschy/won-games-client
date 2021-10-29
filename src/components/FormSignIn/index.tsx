import { useState } from 'react'
import { signIn } from 'next-auth/client'
import Link from 'next/link'
import { useRouter } from 'next/router'

import { Email, Lock, ErrorOutline } from '@styled-icons/material-outlined'

import { FormLink, FormWrapper, FormLoading, FormError } from 'components/Form'
import Button from 'components/Button'
import TextField from 'components/TextField'

import * as S from './styles'
import { FieldErrors, signInValidate } from 'utils/validations'

const FormSignIn = () => {
  const [values, setValues] = useState({ email: '', password: '' })
  const [loading, setLoading] = useState(false)
  const [fieldError, setFieldError] = useState<FieldErrors>()
  const [formError, setFormError] = useState('')
  const { push } = useRouter()

  const handleInput = (field: string, value: string) => {
    setValues((s) => ({ ...s, [field]: value }))
  }

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()
    setLoading(true)

    const error = signInValidate(values)

    if (Object.keys(error).length) {
      setLoading(false)
      setFieldError(error)
    }

    // sign in
    const result = await signIn('credentials', {
      ...values,
      redirect: false,
      callbackUrl: '/'
    })

    if (result?.url) {
      setLoading(false)
      return push(result?.url)
    }

    // jogar o erro
    setLoading(false)
    setFormError('incorrect email and / or password')
  }

  return (
    <FormWrapper>
      {!!formError && (
        <FormError>
          <ErrorOutline />
          <span>{formError}</span>
        </FormError>
      )}
      <form onSubmit={handleSubmit}>
        <TextField
          name="email"
          placeholder="Email"
          type="email"
          onInputChange={(v) => handleInput('email', v)}
          icon={<Email />}
          error={fieldError?.email}
        />
        <TextField
          name="password"
          placeholder="Password"
          type="password"
          onInputChange={(v) => handleInput('password', v)}
          icon={<Lock />}
          error={fieldError?.password}
        />
        <S.ForgotPassword href="#">Forgot your password?</S.ForgotPassword>

        <Button type="submit" size="large" fullWidth disabled={loading}>
          {loading ? <FormLoading /> : <span>Sign in now</span>}
        </Button>

        <FormLink>
          Don’t have an account?{' '}
          <Link href="/sign-up">
            <a>Sign up</a>
          </Link>
        </FormLink>
      </form>
    </FormWrapper>
  )
}

export default FormSignIn
