---
title: Home
params:
  pageHeader:
    enabled: true
    condensed: false
    heading: Home
    subheading: This is a subheading.
    image: /media/image.jpg
  components:
    - variant: success
      content: |
        **Success!** Your changes have been saved by Tina.
      type: alert
    - level: '2'
      text: Requirements
      type: heading
    - exclusive: true
      details:
        - summary: Graduation Requirements
          content: |
            Requires 40 credits, including a passing grade in health, geography, history, economics, and wood shop.
          open: true
        - summary: System Requirements
          content: |
            Requires a computer running an operating system. The computer must have some memory and ideally some kind of long-term storage. An input device as well as some form of output device is recommended.
        - summary: Job Requirements
          content: |
            Requires knowledge of HTML, CSS, JavaScript, accessibility, web performance, privacy, security, and internationalization, as well as a dislike of broccoli.
      type: accordion
    - cardlist:
        - card:
            heading: Card 1
            description: Card description goes here.
            content: |
              This is the card content. It can contain any HTML.
            footer:
              - button:
                  text: Learn more
                  url: /
                  style: default
                  variant: primary
                  size: large
              - button:
                  text: Learn more
                  url: /
                  style: ghost
                  variant: secondary
        - card:
            heading: Card 2
            content: |
              This is the card content. It can contain any HTML.
            footer:
              - button:
                  text: Learn more
                  url: /
                  style: outline
                  variant: danger
                  size: large
      type: cards
    - tablist:
        - tab: Account
          tabpanel: |
            ### Account Settings

            Manage your account information here.
        - tab: Password
          tabpanel: |
            ### Password Settings

            Change your password here.
        - tab: Notifications
          tabpanel: |
            ### Notification Settings

            Configure your notification preferences.
      type: tabs
    - content: |
        # Heading 1

        ## Heading 2

        ### Heading 3

        #### Heading 4

        ##### Heading 5

        ###### Heading 6

        This is a paragraph with **bold text**, *italic text*, and [a link](#).

        Here's some `inline code` and a code block:

        ```javascript
        function hello() {
          console.log('Hello, World!');
        }
        ```

        > This is a blockquote. It's styled automatically.

        * Unordered list item 1
        * Unordered list item 2
        * Unordered list item 3

        1. Ordered list item 1
        2. Ordered list item 2
        3. Ordered list item 3
      type: content
---

