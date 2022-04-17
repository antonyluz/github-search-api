import './App.css';
import { Box, Text, Heading, Input, Button, Card, Avatar } from '@dracula/dracula-ui';
import { useState, useEffect } from 'react';

import Badge from './components/Badge'

function App() {

  const [query, setQuery] = useState("");
  const [searchRes, setSearchRes] = useState([]);
  const [username, setUsername] = useState("");
  const [loading, setLoading] = useState(false);
  const [repos, setRepos] = useState([]);

  useEffect(() => {

    if(!username) return;
    
    fetch(`https://api.github.com/users/${username}/repos`)
    .then(response => response.json())
    .then((data) => setRepos(data));
  },[username]);

  const handleSearch = async () => {

    setLoading(true);

    await fetch(`https://api.github.com/search/users?q=${query}`) 
    .then(response => response.json())
    .then(data => {
      setSearchRes(data.items);
    });

    setLoading(false);
  }

  return (
    <div>
        <header style={{maxWidth: 800}}>
          <Box p="md">
            <Heading color="cyanGreen" size="2xl">Github Client</Heading>
            <Text size="sm" color="blackSecondary">
              The Search API helps you search for the specific item you want to find. For example, 
              you can find a user or a specific file in a repository. Think of it the way you think 
              of performing a search on Google. Try a search:
            </Text>
          </Box>
        </header>

        <div className="container row">
          <div className="col-md-9">
            <div style={{maxWidth: 600}}>
              <Box display="flex">
                <Input color="cyan" 
                placeholder="Buscar Usuário" 
                value={query} 
                onChange ={({target}) => setQuery(target.value)}
                />
                <Button 
                variant="ghost" 
                color="cyan" 
                mx="sm" 
                style={{minWidth: 120}} 
                as="button"
                type="submit"
                onClick={handleSearch}
                >
                 {loading ? "..." : "Pesquisar"} 
                </Button>
              </Box>
            </div>
            <div className="row my-5">
                {searchRes.map((user) => (
                 <div key={user.id} className="col-lg-4">
                    <Card variant='subtle' color="cyan" p="sm" mt="sm">
                      <div className='d-flex justify-content-between align-items-center'>
                        <div className='d-flex align-items-center'>
                        <Avatar
                            title={user.login}
                            src={user.avatar_url}
                            color="blackSecondary"
                            borderVariant='large'
                            style={{width: 40, height: 40}}
                          />
                          <div className='row'>
                            <Heading size="sm" pl="sm" color="white" style={{marginLeft: 5}}>{user.login}</Heading>
                            <Badge badgeTitle={user.id} />
                          </div>
                          
                        </div>
                      </div>
                      <div className='d-flex mt-5'>
                          <div>
                            {username == user.login ? (
                              <Button variant='normal' size='sm' disabled={true}>Selecionado</Button>
                            ) : (
                              <Button color="cyan" variant='ghost' size='sm' onClick={() => setUsername(user.login)}>Selecionar</Button>
                            )}
                            </div>
                      </div>
                    </Card>
                   </div>
                ))}
              </div>
          </div>
          <div className="col-md-3 px-5">
            <Heading color="cyanGreen" size="xl">
              Repositórios
            </Heading>
            <Text>{username ? repos.map((repo) => (<p>{repo.name}</p>)) : <p>Faça uma busca</p>}</Text>
          </div>
        </div>

    </div>
  );
}

export default App;
