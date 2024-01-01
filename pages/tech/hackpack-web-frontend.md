# Web Frontend Hackpack

我们将构建一个类似于以下样式的日记/笔记网络应用：

![示例](https://cloud.githubusercontent.com/assets/3401801/21839837/cc082120-d78e-11e6-836e-0cad2e505736.png)

为了构建这个应用，我们将使用 React 和 Redux。为了存储我们的数据，我们将使用 LocalStorage，它允许您在浏览器中拥有一种小型数据存储。

有许多不同的方法和框架可以用来创建相同的应用，但我喜欢 React + Redux，因为它们共同为您提供了一种处理交互、流动数据和为应用创建新功能的非常清晰和逻辑的方式。

本教程包括使用许多 ES6（和JavaScript的更新版本）语法的代码。如果您对某些语法不熟悉，[这里](http://es6-features.org/)是一个很好的参考来源。如果您对JavaScript不熟悉，[这里](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference)是一个很好的参考工具，[这里](https://developer.mozilla.org/en-US/docs/Learn/JavaScript/First_steps/A_first_splash)和[这里](https://www.codecademy.com/)是很好的学习资源。

首先，确保您已经安装了git并克隆了此存储库：

```
git clone https://github.com/TreeHacks/hackpack-web-frontend
```
如果你还没有安装，请按照[这里](https://nodejs.org/en/download/package-manager/)的说明安装 Node.js。

进入你克隆存储库的文件夹并安装必要的软件包：

```
cd hackpack-web-frontend
npm install
```

这可能需要一些时间，但一旦安装完成，请确保你可以通过运行以下命令来启动应用程序：



```
npm run dev
```

这个命令运行一个开发服务器（你可以在 `package.json` 中查看实际的命令），它会在你进行更改时自动重新加载你的应用程序。在本教程中，你不需要太担心这个命令的具体内容（但如果你感兴趣的话，该应用程序正在使用 [React 热加载](https://www.youtube.com/watch?v=xsSnOQynTHs)）。

打开 [http://localhost:3000](http://localhost:3000)，你应该能看到一个相当空的界面。

现在你已经成功安装并运行了应用程序，让我们开始编码。

在 React 中，你的应用程序的每个部分（按钮、标题等）都可以被定义为一个 '组件'，你可以在需要的任何地方重复使用它们。


Redux 本质上允许我们在应用程序中拥有一个集中的数据存储，我们可以通过应用程序流动数据并分派操作来修改它（如果现在完全不明白，不要担心！稍后你会明白的）。

### 构建块（组件）

对于日记界面，我们将需要一个侧边栏和一个编辑界面组件。侧边栏将列出您的条目，您可以单击其中一个来进行编辑，或者创建一个新的条目。编辑界面将是一个纯文本输入区域。让我们进一步定义这些组件。

在 `src/app/components/journal/Sidebar.jsx` 中，用以下内容替换：

```jsx
import React from 'react';
import _ from 'lodash';
import { Link } from 'react-router';

const Sidebar = ({
  // props go here
}) => {
  let displayEntries = [];
  let entries = [{
    id: '1',
    text: 'Hello world',
    date: new Date()
  }]

  entries.forEach(entry => {
    let text = entry.text.substr(0, 20) + '...';
    displayEntries.push((
      <li key={entry.id} onClick={() => { selectEntry(entry.id); }}>
        {text}
      </li>
    ));
  })

  return (
    <div className="sidebar">
      <h2>Your entries</h2>
      <div
        className="button new-button"
        onClick={(e) => {
        e.preventDefault();
        // actions to dispatch go here
      }}>New</div>
      <ul>
        {displayEntries}
      </ul>
    </div>
  );
}

export default Sidebar;
```

声明语法定义了一个新的 React '组件'。

在这里，我们硬编码了变量 `entries`，然后通过它们进行迭代，以显示每个条目的 `li` 项。

接下来，在 `src/app/components/journal/EditEntry.jsx` 中，将内容更改为以下内容：
```
import React from 'react';
import _ from 'lodash';

const EditEntry = ({
  // props go here
}) => {
  let entry = {
    id: '1',
    text: 'Hello world',
    date: new Date()
  }

  return (
    <textarea
      id="editEntry"
      className="edit-entry"
      name="editEntry"
      value={entry.text}
      onChange={(e) => {
        // action to call on change
      }}>
    </textarea>
  )
}

export default EditEntry;
```

这个 `textarea` 将始终显示我们定义的 `entry` 变量的内容 `Hello world`。

当前默认要显示的组件是 `src/app/components/Journal.jsx`。在该文件中，我们需要将 `Sidebar` 和 `EditEntry` 添加到 `Journal` 组件中，以便在打开网站时渲染它们。在 `Journal.jsx` 文件中，将其更改为以下内容：


```
import React from 'react';
import Sidebar from './Sidebar';
import EditEntry from './EditEntry';
import './journal.scss';

const Journal = ({
  // props go here
}) => {
  return (
    <div className="journal">
      <Sidebar />
      <EditEntry />
    </div>
  )
}

export default Journal;
```

在顶部导入这两个组件，然后将它们添加到渲染的内容中。

尝试重新打开应用程序，你会发现无法编辑 `textarea` 的内容。这是因为当其值更改时，它的值没有更新。我在那里留下了一些占位符注释，我们将在那里添加一些**操作**！现在我们将使一切真正实用。

### 操作！
在这个网站的这个迭代中，我们将支持三个操作：

1. 用户可以编辑当前条目（最近打开网站时将显示最新的条目）。
2. 用户可以选择编辑不同的条目。
3. 用户可以创建新条目。

在 `src/app/actions/actionTypes.js` 中添加这些：

```
export const NEW_ENTRY = 'NEW_ENTRY';
export const UPDATE_ENTRY = 'UPDATE_ENTRY';
export const SELECT_ENTRY = 'SELECT_ENTRY';
```

我们将使用这些常量，以便在整个应用程序中拥有一致的操作类型名称。

在 `src/app/actions/index.js` 中添加以下代码：

```jsx
import * as actionTypes from './actionTypes';
import lodash from 'lodash';
import shortid from 'shortid';

export const updateEntry = (id, text) => {
  let entries = JSON.parse(localStorage.getItem('entries'));
  if(id === undefined || id === "") {
    id = shortid.generate();
    entries.unshift({
      id,
      text,
      date: new Date()
    })
  } else {
    let entryIndex = _.findIndex(entries, (entry) => { return id === entry.id; });
    if(entryIndex === 0) {
      entries[entryIndex]= {
        id,
        text,
        date: new Date()
      }
    } else {
      entries.splice(entryIndex, 1);
      entries.unshift({
        id,
        text,
        date: new Date()
      });
    }
  }

  localStorage.setItem('entries', JSON.stringify(entries));

  return {
    type: actionTypes.UPDATE_ENTRY,
    id,
    entries
  };
}

export const newEntry = () => {
  let entries = JSON.parse(localStorage.getItem('entries'));
  let id = shortid.generate();
  let entry = {
    id,
    text: '',
    date: new Date()
  };

  entries.unshift(entry);
  localStorage.setItem('entries', JSON.stringify(entries));

  return {
    type: actionTypes.NEW_ENTRY,
    id,
    entries
  };
}

export const selectEntry = (id) => {
  return {
    type: actionTypes.SELECT_ENTRY,
    id
  };
}
```

这是一大段代码。这里发生了什么呢？

我们正在定义应用程序可能发生的三种操作。我们将我们的 `entries` 存储在 `localStorage` 中。由于 `localStorage` 将我们的数据存储为字符串，当我们检索和保存数据时，我们必须使用 `JSON.parse` 和 `JSON.stringify` 在字符串和对象之间进行转换。

`updateEntry` 函数具有一些逻辑，根据 `id` 来保存新条目或更新现有条目。

`newEntry` 创建并保存存储中的新条目。

`selectEntry` 简单地返回所选 id。

每个操作最终都返回一个带有 `type` 和其他数据点的对象。我们的 `localStorage` 功能模拟了基本数据库的功能。通常，这些操作将调用某个 API（应用程序编程接口）以更新或检索数据。否则，这些操作可能只是传递数据，比如 `selectEntry` 通知应用程序的其余部分用户输入的一些信息。


既然我们已经定义了这些操作，让我们弄清楚如何使用这些操作并相应地更新我们的应用程序状态。

在 `src/app/reducers/index.js` 中将其更改为以下内容：


```jsx
import { combineReducers } from 'redux';
import * as actionTypes from '../actions/actionTypes';
import lodash from 'lodash';
import shortid from 'shortid';

let entries;
try {
  entries = JSON.parse(localStorage.getItem('entries'));
  if(entries === null) {
    throw "entries can't be null";
  }

  if(entries.length === 0) {
    throw "entries can't be empty";
  }
} catch(e) {
  localStorage.setItem('entries', JSON.stringify([{
    id: shortid.generate(),
    text: '',
    date: new Date()
  }]));

  entries = JSON.parse(localStorage.getItem('entries'));
}

const initialState = {
  currentEntry: entries[0].id,
  entries
}

const journalReducer = (state = initialState, action) => {
  switch(action.type) {
    case actionTypes.UPDATE_ENTRY:
      return Object.assign({}, state, {
        entries: action.entries,
        currentEntry: action.id
      });
    case actionTypes.NEW_ENTRY:
      return Object.assign({}, state, {
        entries: action.entries,
        currentEntry: action.id
      });
    case actionTypes.SELECT_ENTRY:
      return Object.assign({}, state, {
        currentEntry: action.id
      });
    default:
      return state;
  }
}

const rootReducer = combineReducers({
  state: (state = {}) => state,
  journal: journalReducer
});

export default rootReducer;
```

这又是一大段代码。在顶部，我们有一些逻辑来初始化 `entries`，如果它为空或无效的话。通常情况下，你不太可能遇到任何错误，但有一些边缘情况可能导致你的 `localStorage` 对象出现问题。

然后，我们定义了 `initialState`，这是在应用程序打开时的默认状态（在任何用户交互之前）。

之后，我们定义了一个 `reducer`，它接受被 `dispatch` 的任何操作，并决定如何使用操作的数据更新状态。如果你以前没有见过 `Object.assign({}, state, { DATA })` 语法，它是将 `{ DATA }` 合并到 `state` 中的新对象中（换句话说，它返回一个带有 `{ DATA }` 的更新状态）。`reducer` 返回这个更新后的状态。然后将应用程序的状态更新为新状态。

现在，实际上动作已经 **做** 了一些事情，让我们开始向组件中添加数据和动作。

将 `src/app/containers/Journal.jsx` 更改为：


```jsx
import React from 'react';
import { connect } from 'react-redux';
import Journal from '../components/journal/Journal.jsx';
import {
  updateEntry,
  newEntry,
  selectEntry
} from '../actions/index';

const mapStateToProps = (state) => {
  return {
    currentEntry: state.journal.currentEntry,
    entries: state.journal.entries,
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    updateEntry: ({id, text}) => {
      dispatch(updateEntry(id, text))
    },
    newEntry: () => {
      dispatch(newEntry());
    },
    selectEntry: (id) => {
      dispatch(selectEntry(id));
    }
  }
}

const JournalContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Journal)

export default JournalContainer;
```

`JournalContainer` 在这里包装了我们之前定义的 `Journal` 组件，并通过调用 `connect` 将其与Redux的数据存储绑定在一起。

在这里，我们还传递了两个函数：`mapStateToProps` 和 `mapDispatchToProps`。我们有这些函数来过滤我们想要传递到 `Journal` 的状态的哪些部分。 `dispatch` 函数本质上是将来自给定操作的数据发送到 reducers，这些 reducers 再次决定如何获取该数据并更新应用程序的整体状态。

在 `src/app/components/journal/Journal.jsx` 中，将 `Journal` 变量更新为：


```jsx
const Journal = ({
  entries,
  currentEntry,
  newEntry,
  selectEntry,
  updateEntry
}) => {
  return (
    <div className="journal">
      <Sidebar
        newEntry={newEntry}
        selectEntry={selectEntry}
        entries={entries} />
      <EditEntry
        entries={entries}
        currentEntry={currentEntry}
        updateEntry={updateEntry} />
    </div>
  )
}
```

在这里，我们获取了刚刚在 `JournalContainer` 中创建的所有 `props`，并为 `Sidebar` 和 `EditEntry` 提供了访问权限。

现在，让我们使用这些 `props`。在 `src/app/components/journal/Sidebar.jsx` 中，将 `Sidebar` 更改为：

```jsx
const Sidebar = ({
  entries,
  newEntry,
  selectEntry
}) => {
  let displayEntries = [];
  entries.forEach(entry => {
    let text = entry.text.substr(0, 20) + '...';
    displayEntries.push((
      <li key={entry.id} onClick={() => { selectEntry(entry.id); }}>
        {text}
      </li>
    ));
  })

  return (
    <div className="sidebar">
      <h2>Your entries</h2>
      <div
        className="button new-button"
        onClick={(e) => {
        e.preventDefault();
        newEntry();
      }}>New</div>
      <ul>
        {displayEntries}
      </ul>

    </div>
  );
}
```

你的 `EditEntry` 组件为：

```jsx
const EditEntry = ({
  entries,
  currentEntry,
  updateEntry
}) => {
  let entry = _.find(entries, (e) => {
    return e.id === currentEntry;
  });

  return (
    <textarea
      id="editEntry"
      className="edit-entry"
      name="editEntry"
      value={entry.text}
      onChange={(e) => {
        updateEntry({
          id: currentEntry,
          text: document.getElementById('editEntry').value
        });
      }}>
    </textarea>
  )
}
```

相比之前的硬编码变量，我们现在使用了传递下来的 `props`（状态数据和调度函数）。

现在你的应用应该是完全可用的！你可以编辑条目并创建新的条目。

### 连接到新页面
由于你将来可能会发现自己需要这样做，这是如何添加到页面的方法。

在你的 `Sidebar` 组件中，在定义的末尾的 `</ul>` 后面添加 `<Link to='/about'>About</Link>`。在文件的顶部，你会看到我们已经 `import` 了 `{ Link } from 'react-router';`。添加这个后，你就可以点击该链接，它会跳转到 `/about`。你可以在 `src/app/components/about/About.jsx` 中查看该组件。

### 总结
你已经成功构建了一个基本的 React + Redux 应用程序 - 包括组件、操作、减速器等！一开始，React + Redux 被认为学习曲线陡峭，所以如果你对应用程序中发生的事情仍然有疑问，那没关系。

为了巩固你的理解，这里有一些你可以添加到你的应用程序的内容：

- 删除功能（让用户删除一个条目）
- 在侧边栏下每个条目的列表中显示创建/编辑日期
- 为每个条目添加标题属性，并在侧边栏中显示该标题

除此之外，你可以为这个日志应用程序添加许多功能，放弃整个日志应用程序，并使用你新获得的知识去构建完全不同的东西，通过你的操作将应用程序连接到后端服务器（而不是使用 `localStorage`）。可能性是无穷无尽的。


在 `completed` 分支中查看完整的代码。

