import axios from 'axios'
import React from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import toast from 'react-hot-toast'

const baseUrl = 'https://linked-posts.routemisr.com'

const registerSchema = z
  .object({
    name: z
      .string()
      .nonempty('Name is required')
      .min(2, 'Name must be at least 2 characters long'),
    email: z
      .string()
      .nonempty('Email is required')
      .regex(
        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
        'Invalid email format'
      ),
    password: z
      .string()
      .nonempty('password is required')
      .regex(
        /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,
        'Password must be at least 8 characters long and include uppercase, lowercase, number, and special character'
      ),
    rePassword: z.string().nonempty('Confirm password is required'),
    dateOfBirth: z
      .string()
      .nonempty('Date of birth is required')
      .refine(
        (val) => {
          let today = new Date()
          const userDate = new Date(val)

          if (userDate.getFullYear() > today.getFullYear()) return false
          if (userDate.getFullYear() === today.getFullYear()) {
            if (userDate.getMonth() > today.getMonth()) return false
            if (
              userDate.getMonth() === today.getMonth() &&
              userDate.getDate() > today.getDate()
            )
              return false
          }

          const age = today.getFullYear() - userDate.getFullYear()
          return age >= 13
        },
        {
          message: 'You must be at least 13 years old',
        }
      ),
    gender: z.string().regex(/(male|female)/, 'Invalid gender'),
  })
  .refine((data) => data.password === data.rePassword, {
    message: 'Passwords must match',
    path: ['rePassword'],
  })

const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(registerSchema),
  })



  const navigate = useNavigate()

  const handleLogin = async (data) => {
    console.log(data)

    try {
      const response = await axios.post(`${baseUrl}/users/signup`, data, {
        headers: {
          'Content-Type': 'application/json',
        },
      })
      console.log(response.data);
      
      toast.success('Registration successful!')
      navigate('/login')
    } catch (error) {
      toast.error(
        error?.response?.data?.message ||
          'Registration failed. Please try again.'
      )
    }
  }

  return (
    <section className="bg-gray-50 dark:bg-gray-900 min-h-screen flex items-center justify-center ">
      <div className="w-full max-w-md p-5 bg-white rounded-lg shadow dark:bg-gray-800">
        <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 dark:text-white mb-6">
          Create an account
        </h1>
        <form className="space-y-4" onSubmit={handleSubmit(handleLogin)}>
          <div>
            <label
              htmlFor="name"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Full Name
            </label>
            <input
              type="text"
              name="name"
              id="name"
              className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
              placeholder="John Doe"
              {...register('name')}
            />
            {errors.name && (
              <p className="text-red-500">{errors.name.message}</p>
            )}
          </div>
          <div>
            <label
              htmlFor="email"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Your email
            </label>
            <input
              type="email"
              name="email"
              id="email"
              className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
              placeholder="name@example.com"
              {...register('email')}
            />
            {errors.email && (
              <p className="text-red-500 ">{errors.email.message}</p>
            )}
          </div>
          <div>
            <label
              htmlFor="password"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Password
            </label>
            <input
              type="password"
              name="password"
              id="password"
              placeholder="••••••••"
              className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
              {...register('password')}
            />
            {errors.password && (
              <p className="text-red-500 ">{errors.password.message}</p>
            )}
          </div>
          <div>
            <label
              htmlFor="rePassword"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Confirm password
            </label>
            <input
              type="password"
              name="rePassword"
              id="rePassword"
              placeholder="••••••••"
              className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
              {...register('rePassword')}
            />
            {errors.rePassword && (
              <p className="text-red-500 ">{errors.rePassword.message}</p>
            )}
          </div>
          <div>
            <label
              htmlFor="dateOfBirth"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Date of Birth
            </label>
            <input
              type="date"
              id="dateOfBirth"
              {...register('dateOfBirth')}
              className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            />
            {errors.dateOfBirth && (
              <p className="text-red-500 ">{errors.dateOfBirth.message}</p>
            )}
          </div>

          <div>
            <label
              htmlFor="gender"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Gender
            </label>
            <select
              id="gender"
              {...register('gender')}
              className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            >
              <option value="">Select gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
            {errors.gender && (
              <p className="text-red-500 ">{errors.gender.message}</p>
            )}
          </div>

          <button
            type="submit"
            className="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Create account
          </button>
        </form>
      </div>
    </section>
  )
}

export default Register
