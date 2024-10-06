import '@aws-amplify/ui-react/styles.css';
import { useEffect, useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import '../App.css';


const Header = () => {
    const location = useLocation();
    const removeSpace = location?.search?.slice(3).split("%20").join(" ")
    // console.log("space", removeSpace)
    const [searchInput, setSearchInput] = useState(removeSpace);
    const nav = useNavigate();


    // const Navigation = {
    //     {
    //         <label htmlFor="TV shows"></label> 

    //     }
    // }
    useEffect(() => {
        if (searchInput) {
            nav(`/search?q=${searchInput}`);
        }
    }, [searchInput, nav]);

    const handleSubmit = (e: any) => {
        e.preventDefault();

    }

    return (
        <header className='fixed top-0 w-full h-16 bg-neutral-600 bg-opacity-75 z-20'>
            <div className='container mx-auto px-2 flex text-red-500 h-full items-center '>
                <div className='text-lg font-bold'>
                    <Link to='/'>
                        <h2>Movie</h2>
                    </Link>
                </div>
                <div className='hidden lg:flex items-center gap-3 ml-5'>
                    <nav className=''>
                        <a href='/tv' >
                            <label htmlFor="TV Shows" className='px-3 hover:text-neutral-100'>TV Shows</label>
                        </a>
                        <a href='/movie'>
                            <label htmlFor="Movies" className='hover:text-neutral-100'>Movies</label>
                        </a>
                    </nav>
                </div>
                <div className='hidden: lg:flex items-center ml-auto '>
                    <form className='px-4 outline-none border-none flex items-center gap-3' onSubmit={handleSubmit}>
                        <input type='text '
                            placeholder='Search here.....' className='outline-none border-none bg-neutral-600 rounded-r-lg text-white'
                            onChange={(e) => setSearchInput(e.target.value)}
                            value={searchInput} />
                        <button className='text-white text-xl'>
                            <FaSearch />
                        </button>

                    </form>


                </div>
            </div>

        </header>
    )
}

export default Header