import { signInValidate, signUpValidate } from '.'

describe('validation', () => {
  describe('signInValidate()', () => {
    it('should validate empty fields', () => {
      const values = { email: '', password: '' }

      expect(signInValidate(values)).toMatchObject({
        email: '"email" is not allowed to be empty',
        password: '"password" is not allowed to be empty'
      })
    })

    it('should return invalid email error', () => {
      const values = { email: 'email', password: '1234' }

      expect(signInValidate(values)).toMatchObject({
        email: '"email" must be a valid email'
      })
    })
  })

  describe('signUpValidate()', () => {
    it('should validate empty fields', () => {
      const values = { username: '', email: '', password: '' }

      expect(signUpValidate(values)).toMatchObject({
        email: expect.any(String),
        username: expect.any(String),
        password: expect.any(String),
        confirm_password: expect.any(String)
      })
    })

    it('should return short username error', () => {
      const values = {
        username: 'john',
        email: 'john@gmail.com',
        password: '1234'
      }

      expect(signUpValidate(values)).toMatchObject({
        username: '"username" length must be at least 5 characters long'
      })
    })

    it('should return invalid email error', () => {
      const values = {
        username: 'johndoe',
        email: 'invalid-email',
        password: '1234'
      }

      expect(signUpValidate(values)).toMatchObject({
        email: '"email" must be a valid email'
      })
    })

    it('should return error with passwords do not match', () => {
      const values = {
        username: 'johndoe',
        email: 'john_dow@gmail.com',
        password: '1234',
        confirm_password: '4321'
      }

      expect(signUpValidate(values)).toMatchObject({
        confirm_password: 'passwords do not match'
      })
    })
  })
})
