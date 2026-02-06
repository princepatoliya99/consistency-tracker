import Header from './Header'
import Footer from './Footer'

function Layout({ children, theme, toggleTheme, currentUser, handleLogout }) {
  return (
    <div className="app-layout">
      <Header 
        theme={theme} 
        toggleTheme={toggleTheme} 
        currentUser={currentUser} 
        handleLogout={handleLogout} 
      />
      <main className="app-main">
        {children}
      </main>
      <Footer />
    </div>
  )
}

export default Layout
