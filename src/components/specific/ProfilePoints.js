import { Flex } from '@radix-ui/themes';
import React from 'react';
import point from '../../Media/point.gif';

function ProfilePoints({ userData }) {
    const points = userData && userData.points ? userData.points : 0;

    return (
        <Flex direction="row" align="center" style={{ gap: '38rem' }}>
            <h1 style={{ marginRight: '10px', fontSize: '25px', color: 'black' }}>Profile</h1>
            <div
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    backgroundColor: '#F1E7EE',
                    color: 'black',
                    padding: '10px',
                    boxShadow: '0px 2px 5px black',
                    borderRadius: '3px',
                    width: '150px',
                    justifyContent: 'center'
                }}
            >
                <img src={point} alt="point icon" style={{ width: '20px', marginRight: '5px' }} />
                <span style={{ color: 'grey' }}>
                    Points <span style={{ fontWeight: '600', color: 'black' }}>{points}</span>
                </span>
            </div>
        </Flex>
    );
}

export default ProfilePoints;
