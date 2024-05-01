import {useState , createContext} from 'react'

export const AppContext = createContext({});

const AppProvider = ({children}) => {
  const [isLogged, setisLogged] = useState(true)
  const [userDetails, setuserDetails] = useState({})
  return (
    <AppContext.Provider value={{
      isLogged,
      setisLogged,
      userDetails,
      setuserDetails
    }}>
      {children}
    </AppContext.Provider>
  )
}

export default AppProvider
