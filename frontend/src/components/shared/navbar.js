import React from 'react';
import * as NavigationMenu from '@radix-ui/react-navigation-menu';
import classNames from 'classnames';
import { CaretDownIcon } from '@radix-ui/react-icons';
import './navbar.css';
import { Button, Flex, DropdownMenu } from '@radix-ui/themes';
import Logo from '../../Media/logo.png';
import Background from '../../Media/background.png';
import { Link } from 'react-router-dom'

const NavigationMenuDemo = ({ userData}) => {
  
  const token = localStorage.getItem('accessToken');
  
  
  const logout = async () => {
    try {
      localStorage.clear();
      window.location.href = '/';
        if (!token) {
          throw new Error('Access token not found');
        }

      const response = await fetch(`${process.env.REACT_APP_URL}/api/logout`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ refresh_token: localStorage.getItem('refreshToken') })
      });

      if (response.ok) {
        // If logout is successful, clear the local storage and update the user authentication state

        localStorage.clear();
      

        // Update user authentication state (e.g., set isAuthenticated to false)
        // Redirect to the login page or any other desired page
         // Redirect to the login page
        console.log("Logout Successfully")
      } else {
        // If logout fails, handle the error accordingly
        console.error('Logout failed');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const isAdmin = userData && userData.role === 'admin';

  return (
    <div >

   
    <NavigationMenu.Root className=" NavigationMenuRoot w-full"  >
      <Flex gap='20px' className='pt-4' style={{ justifyContent: 'center', alignItems: 'center' }}>
        
      <div className="logo-container opacity-0 md:opacity-100 md:flex items-center">
        <img src={Logo} alt="Logo" className="logo-image" />
        <div className="logo-text font-serif font-normal text-4xl" style={{fontFamily: '"Abril Fatface", serif', fontWeight: '400 ', fontSize: '40px'}}>Green</div>
      </div>


        <NavigationMenu.List className="NavigationMenuList" style={{ flex: 1 }}>
          <NavigationMenu.Item>
            <NavigationMenu.Trigger className="NavigationMenuTrigger">
              Participate <CaretDownIcon className="CaretDown" aria-hidden />
            </NavigationMenu.Trigger>
            <NavigationMenu.Content className="NavigationMenuContent">
              <ul className="List one">
                <li style={{ gridRow: 'span 3' }}>
                  <NavigationMenu.Link asChild>
                    <Link className="Calloutt" to="/">
                      <div className="CalloutHeading">Explore Now</div>
                    </Link>
                  </NavigationMenu.Link>
                </li>
                <ListItem href="/challenges" title="Challenges">
                  Curated Challenges with Minimal Work but Great Eco Effect.
                </ListItem>
                <ListItem href="/events" title="Events">
                  Offline & Online Events around College for Sustainability.
                </ListItem>
                <ListItem href="/resources" title="Resources">
                  A Crisp Set of Educational Resources to Understand the Nature.
                </ListItem>
              </ul>
            </NavigationMenu.Content>
          </NavigationMenu.Item>

          <NavigationMenu.Item>
            <NavigationMenu.Trigger className="NavigationMenuTrigger">
              Overview <CaretDownIcon className="CaretDown" aria-hidden />
            </NavigationMenu.Trigger>
            <NavigationMenu.Content className="NavigationMenuContent">
            <ul className="List two">
  <ListItem title="Homepage" href="/">
    Discover our mission and values at a glance.
  </ListItem>
  <ListItem title="Dashboard" href="/dashboard">
    Your personalized control center.
  </ListItem>
  <ListItem title="Carbon Footprint" href="/carbon-footprint">
    Calculate and track your carbon emissions.
  </ListItem>
  <ListItem title="Waste Management" href="/waste">
    Strategies and tips for effective waste reduction.
  </ListItem>
  <ListItem title="Leaderboard" href="/leaderboard">
    See how you rank against others.
  </ListItem>
  <ListItem title="Forum" href="/forum">
    Join discussions and share your thoughts.
  </ListItem>
</ul>
            </NavigationMenu.Content>
          </NavigationMenu.Item>

          <NavigationMenu.Item>
            <NavigationMenu.Link className="NavigationMenuLink" href="https://github.com/lakshyeahh/Final-Green">
              Github
            </NavigationMenu.Link>
          </NavigationMenu.Item>

          <NavigationMenu.Item>
          {!userData && <Link to="/login">
          <button className="login-button w-full md:w-1/2 px-2 py-2 md:px-4 md:py-1 bg-green-950 rounded-2xl text-white text-center text-xs md:text-sm  md:mx-5">Log In</button>


        </Link>}
            </NavigationMenu.Item>
            <NavigationMenu.Item>
            {userData && (
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <p className='text-xs md:text-sm hidden md:block'>🙋 {userData.name}</p>
          
          <DropdownMenu.Root>
    <DropdownMenu.Trigger>
      <Button variant="surface" color='mint' >
      <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M7.5 0.875C5.49797 0.875 3.875 2.49797 3.875 4.5C3.875 6.15288 4.98124 7.54738 6.49373 7.98351C5.2997 8.12901 4.27557 8.55134 3.50407 9.31167C2.52216 10.2794 2.02502 11.72 2.02502 13.5999C2.02502 13.8623 2.23769 14.0749 2.50002 14.0749C2.76236 14.0749 2.97502 13.8623 2.97502 13.5999C2.97502 11.8799 3.42786 10.7206 4.17091 9.9883C4.91536 9.25463 6.02674 8.87499 7.49995 8.87499C8.97317 8.87499 10.0846 9.25463 10.8291 9.98831C11.5721 10.7206 12.025 11.8799 12.025 13.5999C12.025 13.8623 12.2376 14.0749 12.5 14.0749C12.7623 14.075 12.975 13.8623 12.975 13.6C12.975 11.72 12.4778 10.2794 11.4959 9.31166C10.7244 8.55135 9.70025 8.12903 8.50625 7.98352C10.0187 7.5474 11.125 6.15289 11.125 4.5C11.125 2.49797 9.50203 0.875 7.5 0.875ZM4.825 4.5C4.825 3.02264 6.02264 1.825 7.5 1.825C8.97736 1.825 10.175 3.02264 10.175 4.5C10.175 5.97736 8.97736 7.175 7.5 7.175C6.02264 7.175 4.825 5.97736 4.825 4.5Z" fill="currentColor" fill-rule="evenodd" clip-rule="evenodd"></path>
              </svg>
        <DropdownMenu.TriggerIcon />
      </Button>
    </DropdownMenu.Trigger>
    <DropdownMenu.Content variant="solid">
      <DropdownMenu.Item shortcut="⌘ E">
      <Link to='/dashboard/user'>
           
              User
   
          </Link>
  

      </DropdownMenu.Item>
      <DropdownMenu.Item shortcut="⌘ D">Notifications</DropdownMenu.Item>
      <DropdownMenu.Separator />
      <DropdownMenu.Item shortcut="⌘ ⌫" color="red">
      <Link to='/' 
      onClick={logout}>
        Log Out
       
        </Link>
      </DropdownMenu.Item>
    </DropdownMenu.Content>
  </DropdownMenu.Root>
          
          

          
          
        </div>
      )}

              </NavigationMenu.Item>
              {isAdmin && (
      <NavigationMenu.Item className='NavigationMenuLink ml-20'>
        <Link to='/admin'>
          admin
        </Link>
      </NavigationMenu.Item>
    )}
          <NavigationMenu.Indicator className="NavigationMenuIndicator">
            <div className="Arrow" />
          </NavigationMenu.Indicator>
        </NavigationMenu.List>

        <div className="ViewportPosition">
          <NavigationMenu.Viewport className="NavigationMenuViewport" />
        </div>
        
       
        

      
            </Flex>
    </NavigationMenu.Root>
    </div>
  );
};

const ListItem = React.forwardRef(({ className, children, title, ...props }, forwardedRef) => (
  <li>
    <NavigationMenu.Link asChild>
      <a className={classNames('ListItemLink', className)} {...props} ref={forwardedRef}>
        <div className="ListItemHeading">{title}</div>
        <p className="ListItemText">{children}</p>
      </a>
    </NavigationMenu.Link>
  </li>
));

export default NavigationMenuDemo;
