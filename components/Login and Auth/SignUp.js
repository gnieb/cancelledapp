import { View, TextInput, Button, Text } from 'react-native'
import { Formik } from 'formik'
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

    return(
        <Formik
        initialValues={{
          username: '',
          password: '',
          email: '',
        }}
        validationSchema={signUpFormSchema}
        onSubmit={handleLogInSubmit}
      >
        {({ values, handleChange, handleSubmit, errors, touched }) => (
          <View>
            <TextInput
              placeholder="Username"
              onChangeText={handleChange('username')}
              value={values.username}
            />
            {touched.username && errors.username && <Text>{errors.username}</Text>}
  
            <TextInput
              placeholder="Password"
              onChangeText={handleChange('password')}
              value={values.password}
              secureTextEntry
            />
            {touched.password && errors.password && <Text>{errors.password}</Text>}
  
            <TextInput
              placeholder="Email"
              onChangeText={handleChange('email')}
              value={values.email}
              keyboardType="email-address"
            />
            {touched.email && errors.email && <Text>{errors.email}</Text>}
  
            <Button title="Submit" onPress={handleSubmit} />
          </View>
        )}
      </Formik>
    );
  };

export default SignUp