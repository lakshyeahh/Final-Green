import React from 'react';
import { Flex, Box } from '@radix-ui/themes';
import first from "../../Media/first.png";
import second from "../../Media/second.png";
import third from "../../Media/third.png";
import fourth from "../../Media/fourth.png";
import fifth from "../../Media/fifth.png";

function UserCard({ userData }) {
  if (!userData) {
    // If userData is null or undefined, render null or some fallback UI
    return null;
  }

  return (
    <Box height='150px'>
      <div style={{ display: 'flex', flexDirection: 'column', height: '100%', backgroundColor: '#C393F7', position: 'relative', borderRadius: '15px ', width: '90%' }}>
        <div style={{ backgroundColor: '#FEFEFE',height: '60%', color: 'black',paddingLeft: '20px', lineHeight: '15px', borderRadius: '15px ' }}>
          <h3>{userData.name}</h3>
          <p style={{color: 'grey'}}>Student at Punjab Engineering College</p>
        </div>
        <div>
        <Flex gap="15px" style={{ height: '50%' , padding: '20px', paddingTop: '5px'}}>
            <img src={first} alt="First Badge" style={{ width: '55px', height: '70px' }} />
            <img src={second} alt="Second Badge" style={{ width: '55px', height: '70px' }} />
            <img src={third} alt="Third Badge" style={{width: '55px', height: '70px' }} />
            <img src={fourth} alt="Fourth Badge" style={{ width: '55px', height: '70px' }} />
            <img src={fifth} alt="Fifth Badge" style={{ width: '55px', height: '70px' }} />
          </Flex>
        </div>
        <div style={{ flex: 1, display: 'flex', alignItems: 'flex-end', justifyContent: 'center' }}>
          
        </div>
        <Flex gap="4" align="center" style={{ position: 'absolute', top: '20px', right: '20px' }}>
          {userData.profileImage && 
            <div style={{ width: '100px', height: '100px', borderRadius: '50%', overflow: 'hidden' }}>
              <img src={userData.profileImage} alt={`${userData.name}'s profile`} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
          }
        </Flex>
      </div>
    </Box>
  );
}

export default UserCard;
