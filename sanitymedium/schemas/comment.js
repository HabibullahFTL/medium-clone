export default {
    name: 'comment',
    title: 'Comment',
    type: 'document',
    fields: [
      {
        name: 'name',
        title: 'Name',
        type: 'string',
      },
      {
        name: 'approved',
        title: 'Approved',
        description: 'Comment won\'t be visible until it is approved',
        type: 'boolean',
      },
      {
        name: "email",
        title: "Email",
        type: "string",
      },
      {
        name: 'comment',
        title: 'Comment',
        type: 'text',
      },
      {
        name: 'post',
        title: 'Post',
        type: 'reference',
        to: [{type: 'post'}],
      },
    ],
  }
  