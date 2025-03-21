import { Box, Tab, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/react';
import React, { useState } from 'react';
import DetallesPerfil from './DetallesPerfil';
import EditarPerfil from './EditarPerfil';
import { useSelector } from 'react-redux';
import { FaCog, FaUserAlt } from 'react-icons/fa';

const MiPerfil = () => {
  const user = useSelector(state => state.auth.user);
  const [selectedTab, setSelectedTab] = useState(0);

  const handleTabChange = index => {
    setSelectedTab(index);
  };

  return (
    <>
      <Box h="full" _dark={{ bg: "primary.1100" }}>
        <Tabs variant='enclosed'>
          <TabList
            borderRadius={'md'}
            w={'404px'}
            _dark={{
              bg: 'primary.1000',
              color: 'white',
              boxShadow: 'base',
              borderRadius: 'md',
              borderWidth: '1px',
              borderColor: 'gray.700'
            }}
            _focus={{ outline: 'none' }}
            border={'1px'}
            borderColor={'gray.200'}
            p={2}
            bgColor={'#f9f9f9'}
            color={'primary.100'}
          >
            <Tab
              borderRadius="none"
              _selected={{ 
                color: 'primary.200', 
                bg: 'white', boxShadow: 'base', borderRadius: 'md' }}
                _dark={{
                  _selected: {
                    color: 'white', bg: 'primary.1100', boxShadow: 'lg', borderRadius: 'md'
                  },
                  focus: {
                    outline: 'none'
                  }
              }}
              _focus={{ outline: 'none' }}
              onClick={() => handleTabChange(0)}
              selected={selectedTab === 0}
            >
              <Box display="flex" alignItems="center">
                <FaUserAlt fontSize={20} style={{ marginRight: '0.3rem' }} />
                Detalles de Mi Perfil
              </Box>
            </Tab>
            <Tab
              ml={1}
              borderRadius="none"
              _selected={{ color: 'primary.200', bg: 'white', boxShadow: 'base', borderRadius: 'md' }}
              _dark={{
                _selected: {
                  color: 'white', bg: 'primary.1100', boxShadow: 'lg', borderRadius: 'md'
                },
                focus: {
                  outline: 'none'
                }
              }}
              _focus={{ outline: 'none' }}
              onClick={() => handleTabChange(1)}
              selected={selectedTab === 1}
            >
              <Box display="flex" alignItems="center">
                <FaCog fontSize={20} style={{ marginRight: '0.3rem' }} />
                Editar Mis Datos
              </Box>
            </Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              {selectedTab === 0 && <DetallesPerfil userData={user?.usuario} />}
            </TabPanel>
            <TabPanel>
              {selectedTab === 1 && <EditarPerfil userData={user?.usuario} />}
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </>
  );
};

export default MiPerfil;
