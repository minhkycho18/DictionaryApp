import AsyncStorage from '@react-native-async-storage/async-storage';

const getSearchHistory = async () => {
    try {
      const historyJSON = await AsyncStorage.getItem('searchHistory');
      return historyJSON ? JSON.parse(historyJSON) : [];
    } catch (error) {
      console.error('Lỗi khi lấy lịch sử tìm kiếm: ', error);
      return [];
    }
};

const addSearchToHistory = async (search) => {
    try {
      let history = await getSearchHistory();
      if(history.includes(search)){
        const index = history.indexOf(search);
        history = history.filter((item,i) => {return i !== index});
      }
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