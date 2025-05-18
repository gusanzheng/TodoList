// src/TodoList.tsx
import React, { useState, useMemo } from 'react';
import { 
  Checkbox, 
  TextField, 
  Button, 
  List, 
  ListItem, 
  ListItemText, 
  ListItemIcon,
  Typography
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

interface TodoItem {
  id: number;
  text: string;
  completed: boolean;
}

const TodoList: React.FC = () => {
  const [todos, setTodos] = useState<TodoItem[]>([]);
  const [newTodo, setNewTodo] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  // 修改后的添加计划函数 - 新条目出现在最上方
  const addTodo = () => {
    if (newTodo.trim() !== '') {
      const newItem = {
        id: Date.now(),
        text: newTodo,
        completed: false
      };
      
      // 新计划添加到数组开头
      setTodos([newItem, ...todos]);
      setNewTodo('');
    }
  };

  // 切换计划完成状态
  const toggleTodo = (id: number) => {
    const updatedTodos = todos.map(todo => 
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    );
    
    // 重新排序：未完成的在前，已完成的在后
    setTodos([
      ...updatedTodos.filter(todo => !todo.completed),
      ...updatedTodos.filter(todo => todo.completed)
    ]);
  };

  // 处理回车键添加计划
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      addTodo();
    }
  };

  // 过滤计划列表基于搜索关键词
  const filteredTodos = useMemo(() => {
    return todos.filter(todo => 
      todo.text.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [todos, searchTerm]);

  return (
    <div style={{ maxWidth: '500px', margin: '0 auto', padding: '20px' }}>
      <Typography variant="h4" gutterBottom style={{ textAlign: 'center' }}>
        计划清单
      </Typography>
      
      {/* 搜索框 */}
      <div style={{ marginBottom: '20px' }}>
        <TextField
          fullWidth
          variant="outlined"
          placeholder="搜索计划..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          InputProps={{
            startAdornment: <SearchIcon style={{ marginRight: '8px', color: 'action.active' }} />
          }}
        />
      </div>
      
      {/* 添加新计划 */}
      <div style={{ display: 'flex', marginBottom: '20px' }}>
        <TextField
          fullWidth
          variant="outlined"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="添加新计划..."
        />
        <Button 
          variant="contained" 
          color="primary" 
          onClick={addTodo}
          style={{ marginLeft: '10px' }}
        >
          添加
        </Button>
      </div>
      
      {/* 计划列表 */}
      {filteredTodos.length === 0 ? (
        <Typography style={{ textAlign: 'center', color: 'gray' }}>
          {searchTerm ? '没有匹配的计划' : '暂无计划'}
        </Typography>
      ) : (
        <List>
          {filteredTodos.map(todo => (
            <ListItem 
              key={todo.id} 
              style={{ 
                textDecoration: todo.completed ? 'line-through' : 'none',
                color: todo.completed ? 'gray' : 'inherit',
                backgroundColor: todo.completed ? '#f5f5f5' : 'inherit',
                borderRadius: '4px',
                marginBottom: '4px'
              }}
            >
              <ListItemIcon>
                <Checkbox
                  edge="start"
                  checked={todo.completed}
                  onChange={() => toggleTodo(todo.id)}
                />
              </ListItemIcon>
              <ListItemText primary={todo.text} />
            </ListItem>
          ))}
        </List>
      )}
    </div>
  );
};

export default TodoList;