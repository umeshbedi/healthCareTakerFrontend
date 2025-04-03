import { Alert, Share } from "react-native";

// export const apiUrl = "http://192.168.45.155:3002/api/"
export const apiUrl = "https://munafaapp-backend.onrender.com/api/"


export async function ShareApp(){
    try {
      const result = await Share.share({
        title:'Munafa App',
        message:"This is the Best Munafa App",
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error:any) {
      Alert.alert(error.message);
    }
  }

  