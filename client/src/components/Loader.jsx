import { Loader2 } from 'lucide-react'
import React from 'react'

const Loader = () => {
  return (
    <section>
        <div className="container flex justify-center items-center h-screen">
           <Loader2 className='animate-spin w-10 h-10'/>
        </div>
    </section>
  )
}

export default Loader