import { View, TextInput, Button, Text } from 'react-native'
import { useFormik } from 'formik'
import * as yup from 'yup'

function SignUp({handleLogInSubmit}) {

    const signUpFormSchema = yup.object().shape({
        username : yup.string()
            .required('You must enter a username!'),
        password : yup.string()
            .required('You must enter a password!'),
        email: yup.string()
            .required('You must enter an email!')
            .email("Invalid Email!")
    });

    const formik = useFormik({
      initialValues: {
          username: '',
          password: '',
          email: ''
      },
      validationSchema: signUpFormSchema,
      onSubmit: (values) => handleLogInSubmit(values)
  });

    return(
      <View>
      <TextInput
          placeholder='username'
          onChangeText={formik.handleChange('username')}
          onBlur={formik.handleBlur('username')}
          value= {formik.values.username}
      >
      </TextInput>
      {formik.touched.username && formik.errors.username && (
          <Text style={{ color: 'red' }}>{formik.errors.username}</Text>
      )}
      <TextInput
          placeholder='password'
          onChangeText={formik.handleChange('password')}
          onBlur = {formik.handleBlur('password')}
          value= {formik.values.password}
      >
      </TextInput>
      {formik.touched.password && formik.errors.password && (
          <Text style={{ color: 'red' }}>{formik.errors.password}</Text>
      )}
      <TextInput
          placeholder='email'
          onChangeText={formik.handleChange('email')}
          onBlur={formik.handleBlur('email')}
          value= {formik.values.email}
      >
      </TextInput>
      {formik.touched.email && formik.errors.email && (
          <Text style={{ color: 'red' }}>{formik.errors.email}</Text>
      )}
      <Button
          title = 'Sign In'
          onPress = {formik.handleSubmit}
      />
    </View>
  )
}

export default SignUp