import {View, Text, Alert} from "react-native";
import CustomInput from "@/components/CustomInput";
import CustomButton from "@/components/CustomButton";
import {Link, router} from "expo-router";
import {useState} from "react";
import {signIn} from "@/lib/appwrite";
import * as Sentry from '@sentry/react-native';

export default function SignIn() {
	const [isSubmitted, setIsSubmitted] = useState(false);
	const [form, setForm] = useState({email: "", password: ''});


	const submit = async () => {

		const {email, password} = form;

		if (!email || !password) return Alert.alert('Error', 'Please enter valid email and password')

		setIsSubmitted(true)

		try {

			await signIn({email: email, password: password})

			router.replace('/')
		} catch (error: any) {
			Alert.alert('Error', error.message)
			Sentry.captureEvent(error)
		} finally {
			setIsSubmitted(false)
		}
	}
	return (
		<View className={"gap-10 bg-white rounded-lg p-5 mt-5"}>
			<CustomInput
				placeholder="Enter your email"
				value={form.email}
				onChangeText={(text) => setForm((prev) => ({...prev, email: text}))}
				label="Email"
				keyboardType={"email-address"}
			/>
			<CustomInput
				placeholder="Enter your password"
				value={form.password}
				onChangeText={(text) => setForm((prev) => ({...prev, password: text}))}
				label="password"
				secureTextEntry={true}
			/>

			<CustomButton
				title={"Sign In"}
				isLoading={isSubmitted}
				onPress={submit}
			/>


			<View className={"flex flex-row justify-center gap-2 mt-5"}>
				<Text className={"base-regular text-gray-100"}>
					Don&#39;t have an account?
				</Text>
				<Link href="/sign-up" className={"base-bold text-primary"}>
					Sign Up
				</Link>
			</View>
		</View>
	);
}