import React from 'react'
import '@/assets/styles/globals.css'
export const metadata = {
    title : "Property Pulse",
    description : "find the best rental property",
    keywords : "find , rentals "
}
const MainLayout = ({children}) => {
  return (
    <html lang="en">
      <body>
        <div>{children}</div>
      </body>
    </html>
  );
}

export default MainLayout