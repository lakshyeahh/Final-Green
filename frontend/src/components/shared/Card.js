import React from 'react';
import {
  Card,
  Box,
  Inset,
  Text,
  Strong,
  Heading,
  Badge,
  Flex,
  DataList,
  Link,
  Button
} from '@radix-ui/themes';
import './card.css';
import bkg from '../../Media/background.png';

function CardComponent({
  title,
  description,
  startDate,
  endDate,
  points,
  buttonText,
  isNew,
  participants
}) {
  return (
    <Box maxWidth="240px">
      <div size="2" className='card-container' >
        <div >

    
        <Inset clip="padding-box" side="top" pb="current">
          <img
            src={bkg}
            alt="Background"
            style={{
              display: 'block',
              objectFit: 'cover',
              width: '100%',
              height: 140,
              backgroundColor: '#FEFEFE',
              boxShadow: '0px 0px 5px black',

              borderRadius: '10px'
            }}
          />
        </Inset>
        <Text as="p" size="1" style={{ color: '#51665D' }}>
          <Flex gap='1' align={'center'}>
            <Heading size='5' style={{ color: 'black' }}>{title}</Heading>
            {isNew && (
              <Badge variant="solid" color="teal">
                New
              </Badge>
            )}
          </Flex>
          {description}
        </Text>
        <DataList.Root className='listContainer' orientation={{ initial: 'vertical', sm: 'horizontal' }}>
          <DataList.Item>
            <DataList.Label minWidth="88px" color='pink'>Start:</DataList.Label>
            <DataList.Value><p>{startDate}</p></DataList.Value>
          </DataList.Item>
          <DataList.Item>
            <DataList.Label minWidth="88px" color='plum'>End:</DataList.Label>
            <DataList.Value>
              <p>{endDate}</p>
            </DataList.Value>
          </DataList.Item>
          <DataList.Item>
            <DataList.Label minWidth="88px" color='purple'>Points:</DataList.Label>
            <DataList.Value>
              <p>+{points}</p>
            </DataList.Value>
          </DataList.Item>
          {participants && (
            <DataList.Item>
              <DataList.Label minWidth="88px" color='purple'>Participants:</DataList.Label>
              <DataList.Value>
                <p>{participants}</p>
              </DataList.Value>
            </DataList.Item>
          )}
        </DataList.Root>
        <Flex justify={'center'}>
          <Button radius='medium' style={{ margin: '10px', width: '100%' }}>{buttonText}</Button>
        </Flex>
        </div>
      </div>
    </Box>
  );
}

export default CardComponent;
