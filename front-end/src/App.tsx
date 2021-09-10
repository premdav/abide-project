import React from 'react';

const App = () => {
  return (
    <div className="App">
      <header className="App-header">
        <h1>The <span className='abide'>Abide</span> Project</h1>
        <p>"<span className='abide'>Abide</span> in me, and I in you. As the branch cannot bear fruit by itself, unless it <span className='abide'>abides</span> in the vine, neither can you, unless you <span className='abide'>abide</span> in me."</p>
        <p><em>John 15:4, ESV</em></p>
        <h5><h3 style={{ display: 'inline-block'}}><em className='abide'>Abide:</em></h3> to remain stable or fixed in state</h5>
      </header>
      <footer>Bible reading tracker currently in development. Come back often for updates!</footer>
    </div>
  );
}

export default App;
