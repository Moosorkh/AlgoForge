import { db } from './config/db';

async function fixConstraints() {
  try {
    // Drop old check constraint on category
    try {
      await db.query('ALTER TABLE algorithms DROP CHECK algorithms_chk_1');
      console.log('✅ Dropped category constraint');
    } catch (e: any) {
      console.log('⚠️ Constraint might not exist or different name');
      // Try to find and drop all check constraints
      const [constraints]: any = await db.query(`
        SELECT CONSTRAINT_NAME 
        FROM information_schema.TABLE_CONSTRAINTS 
        WHERE TABLE_NAME = 'algorithms' AND CONSTRAINT_TYPE = 'CHECK'
      `);
      
      for (const constraint of constraints) {
        try {
          await db.query(`ALTER TABLE algorithms DROP CHECK ${constraint.CONSTRAINT_NAME}`);
          console.log(`✅ Dropped constraint: ${constraint.CONSTRAINT_NAME}`);
        } catch (err) {
          console.log(`⚠️ Could not drop ${constraint.CONSTRAINT_NAME}`);
        }
      }
    }

    // Now add React content
    const [reactExists]: any = await db.query('SELECT id FROM algorithms WHERE name = "React.js Fundamentals"');
    
    if (reactExists.length === 0) {
      await db.query(`
        INSERT INTO algorithms (name, description, category, difficulty, main_category)
        VALUES 
        ('React.js Fundamentals', 'Learn the core concepts of React including components, props, state, and hooks.', 'Frontend Framework', 'Beginner', 'Frameworks'),
        ('React Hooks Deep Dive', 'Master React Hooks including useState, useEffect, useContext, useReducer, and custom hooks.', 'Frontend Framework', 'Intermediate', 'Frameworks'),
        ('React Router', 'Learn client-side routing in React applications using React Router.', 'Frontend Framework', 'Intermediate', 'Frameworks')
      `);
      console.log('✅ Added React frameworks');

      // Add lessons
      await db.query(`
        INSERT INTO lessons (algorithm_id, title, content, lesson_type, order_index)
        VALUES 
        (9, 'Introduction to React', 'React is a JavaScript library for building user interfaces. It allows you to create reusable components that manage their own state.', 'Theory', 1),
        (9, 'React Components', 'Learn about functional and class components, JSX syntax, and component composition.', 'Theory', 2),
        (9, 'Props and State', 'Understand how to pass data between components using props and manage component state.', 'Theory', 3),
        (9, 'React Fundamentals Quiz', 'Test your knowledge of React basics.', 'Quiz', 4),
        (10, 'Introduction to Hooks', 'Hooks let you use state and other React features without writing a class. Learn about useState and useEffect.', 'Theory', 1),
        (10, 'Advanced Hooks', 'Explore useContext, useReducer, useMemo, useCallback, and useRef hooks.', 'Theory', 2),
        (10, 'Custom Hooks', 'Learn how to create your own custom hooks to reuse stateful logic.', 'Theory', 3),
        (10, 'React Hooks Quiz', 'Test your understanding of React Hooks.', 'Quiz', 4),
        (11, 'Introduction to React Router', 'React Router enables navigation between different views in your React application.', 'Theory', 1),
        (11, 'Routes and Links', 'Learn how to define routes and create navigation links in your app.', 'Theory', 2),
        (11, 'Dynamic Routing', 'Master URL parameters, nested routes, and programmatic navigation.', 'Theory', 3),
        (11, 'React Router Quiz', 'Test your knowledge of React Router.', 'Quiz', 4)
      `);
      console.log('✅ Added React lessons');
    } else {
      console.log('⚠️ React content already exists');
    }

    console.log('✅ All done!');
    process.exit(0);
  } catch (error: any) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
}

fixConstraints();
