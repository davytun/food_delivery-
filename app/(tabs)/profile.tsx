import CustomButton from '@/components/CustomButton'
import CustomHeader from '@/components/CustomHeader'
import { images, profile } from '@/constants'
import { View, Text, Image, FlatList, TouchableOpacity } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

const Profile = () => {
  return (
    <SafeAreaView className='bg-white h-full px-5 pt-5'>



      <FlatList
        data={profile}
        renderItem={({ item }) => (
          <View className='flex-row items-center my-4'>
            <View className='w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mr-3'>
              <Image source={item.icons} className='w-6 h-6' />
            </View>
            <View>
              <Text className='text-base text-dark-100'>{item.title}</Text>
              <Text className='base-bold  text-black'>{item.name}</Text>
            </View>
          </View>
        )}
        keyExtractor={(item) => item.title}
        contentContainerStyle={{ paddingBottom: 100 }}
        showsVerticalScrollIndicator={false}
        ListFooterComponent={
          () => (
            <View className='flex items-center justify-center mt-10 gap-5 pb-28'>
              <CustomButton title='Edit Profile' style='bg-primary/10 border  border-primary' textStyle='base-bold text-[#FE8C00]' />
              <CustomButton title='Logout' style='bg-red-100 border border-red-600' textStyle='base-bold text-red-600' leftIcon={<Image source={images.logout} className='w-5 h-5 mr-2' />} />

            </View>
          )
        }
        ListHeaderComponent={() => {
          return (
            <View className='mb-6'>
              <CustomHeader title='Profile' />
              <View className='flex items-center justify-center mt-10'>
                <Image source={images.avatar} className='w-28 h-28 rounded-full justify-center items-center' />
              </View>
            </View>
          )
        }}
      />
    </SafeAreaView>
  )
}

export default Profile