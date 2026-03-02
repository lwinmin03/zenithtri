import { UserRound } from 'lucide-react'

const Header = () => {
    return (
        <div className='flex items-center justify-between  px-6  border-b border-b-gray-400/30 py-2.5'>
            <h1 className='font-medium text-4xl'>
                Zenith
            </h1>
            <div className='flex gap-x-2'>
                <UserRound />
                <span>User</span>
            </div>

        </div>
    )
}

export default Header