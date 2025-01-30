import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { fetchProtectedInfo, onLogout } from '../api/auth'
import Layout from '../components/layout'
import { unauthenticateUser } from '../redux/slices/authSlice'
import '../css/dashboard.css'; 

const Dashboard = () => {
  const dispatch = useDispatch()
  const [loading, setLoading] = useState(true)
  const [protectedData, setProtectedData] = useState(null)

  const logout = async () => {
    try {
      await onLogout()

      dispatch(unauthenticateUser())
      localStorage.removeItem('isAuth')
    } catch (error) {
      console.log(error.response)
    }
  }

  const protectedInfo = async () => {
    try {
      const { data } = await fetchProtectedInfo()

      setProtectedData(data.info)

      setLoading(false)
    } catch (error) {
      logout()
    }
  }

  useEffect(() => {
    protectedInfo()
  }, [])

  return loading ? (
    <Layout>
      <h1>Loading...</h1>
    </Layout>
  ) : (

    <div className="dashboard-background">
    <div>
      <Layout>
      <h1 className="welcome-heading">WELCOME ADMIN!</h1>
        <div className="intro-text">
          <p>We, Jerwin Louise G. Peria, Gea M. Cuevas, and Riana Herlaine Carandang, students from BSIT 2202, 2nd Year, are excited to present "Gear Up," a cutting-edge local web application poised to revolutionize the operations of JPJ Motorparts and Accessories. Our collective vision for "Gear Up" is to transition the shop from its traditional paper-based system to a sophisticated digital platform for sales and inventory management, enhancing efficiency and scalability.</p>
          <p>Central to the functionality of "Gear Up" is its robust admin interface, designed to empower administrative personnel with comprehensive control over all aspects of the business. This interface enables administrators to seamlessly manage user accounts, including both administrative and regular user credentials, ensuring secure access to the platform. Furthermore, the admin dashboard provides intuitive tools for inventory management, allowing administrators to add new products, update stock levels, adjust pricing, and remove obsolete items effortlessly.</p>
          <p>By harnessing the power of real-time data analytics, the admin interface of "Gear Up" empowers administrators to make informed decisions, optimize inventory levels, and track sales performance effectively. With a focus on enhancing operational efficiency and driving sustainable growth, "Gear Up" represents a significant leap forward for JPJ Motorparts and Accessories, positioning the business at the forefront of digital innovation within the local business community.</p>
        </div>
     

        <button onClick={() => logout()} className='btn btn-primary'>
          Logout
        </button>
      </Layout>
    </div>
    </div>
  )
}

export default Dashboard