import AsyncStorage from '@react-native-async-storage/async-storage';

const getSearchHistory = async () => {
    try {
      const historyJSON = await AsyncStorage.getItem('searchHistory');
      console.log("get his")
      return historyJSON ? JSON.parse(historyJSON) : [];
    } catch (error) {
      console.error('Lỗi khi lấy lịch sử tìm kiếm: ', error);
      return [];
    }
};

const addSearchToHistory = async (search) => {
    try {
      const history = await getSearchHistory();
      history.unshift(search);
      await AsyncStorage.setItem('searchHistory', JSON.stringify(history));
    } catch (error) {
      console.error('Lỗi khi lưu lịch sử tìm kiếm: ', error);
    }
  };
  const removeHistory = async (index) => {
    try {
      const historyJSON = await AsyncStorage.getItem('searchHistory');
      const  arrHistory = JSON.parse(historyJSON).filter((item,i) => {return i !== index});
      await AsyncStorage.setItem('searchHistory', JSON.stringify(arrHistory));
      return arrHistory
    } catch (error) {
      console.error('Lỗi khi lấy lịch sử tìm kiếm: ', error);
      return [];
    }
};

export {
    getSearchHistory,
    addSearchToHistory,
    removeHistory
}