export function Home({ user, logout }) {


    return<> <div className='home'>
       <label htmlFor=""> {user.userName} </label>
        <button  style={{ height: "35px" }} onClick={() => { logout() }}> Logout </button>
      </div> </>
    }