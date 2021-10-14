import React from 'react';

const App = () => {
  return (
    <div className="App">
      <header className="App-header">
        <h1>The <span className='abide'>Abide</span> Project</h1>
        {/* <p className='definition'><span style={{ display: 'inline-block', fontWeight: 'bold'}}><em className='abide'>Abide:</em></span> to remain stable or fixed in state</p> */}
        <p>"<span className='abide'>Abide</span> in me, and I in you. As the branch cannot bear fruit by itself, unless it <span className='abide'>abides</span> in the vine, neither can you, unless you <span className='abide'>abide</span> in me."</p>
        <p><em>John 15:4</em></p>
      </header>
      <footer>
        The Abide Project is a Bible reading community, marketplace, and goal tracker with a purpose of getting more people engaged with the word of God.
        <p>Please visit back for updates!</p>
      </footer>
    </div>
  );
}

export default App;
