'use strict';

exports.seed = function(knex, Promise) {
  return Promise.join(
    // Deletes ALL existing entries
    knex('users').del(),
    knex('groups').del(),
    knex('courses').del(),
    knex('group_user').del(),
    knex('course_user').del(),

    // Inserts seed entries
    knex('users').insert([{name: 'User#1'},
                          {name: 'User#2'},
                          {name: 'User#3'},
                          {name: 'User#4'},
                          {name: 'User#5'}]),

    knex('groups').insert([{name: 'Group#1'},
                           {name: 'Group#2'},
                           {name: 'Group#3'},
                           {name: 'Group#4'},
                           {name: 'Group#5'}]),

    knex('courses').insert([{name: 'Course#1'},
                            {name: 'Course#2'},
                            {name: 'Course#3'},
                            {name: 'Course#4'},
                            {name: 'Course#5'}]),

    knex('group_user').insert([{group_id: 1, user_id: 1},
                               {group_id: 2, user_id: 2},
                               {group_id: 3, user_id: 3},
                               {group_id: 4, user_id: 4},
                               {group_id: 5, user_id: 5}]),

   knex('course_user').insert([{course_id: 1, user_id: 1},
                               {course_id: 2, user_id: 2},
                               {course_id: 3, user_id: 3},
                               {course_id: 4, user_id: 4},
                               {course_id: 5, user_id: 5}])
  );
};
