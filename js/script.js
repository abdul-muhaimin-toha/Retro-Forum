// Selecting Elements
const postsContainerElement = document.getElementById('posts-container');
const markedCardsContainerElement = document.getElementById(
  'marked-cards-container'
);
const readCountElement = document.getElementById('read-count');
const articleAddMessageElement = document.getElementById('add-article-text');

// Initial Values
let readCount = 0;

// Creating Spinner
const spinner = document.createElement('div');
spinner.classList = `flex flex-col justify-center items-center gap-2 col-span-full mt-1`;
spinner.innerHTML = ` 
                      <span class="loading loading-spinner text-[#373a81] loading-lg"></span>
                      <p class="text-lg font-bold">Loading, please wait!</p>
                    `;

// Initial All Post Fetch and Displaying
fetchAllPostData();

// All Post Async Function
async function fetchAllPostData() {
  postsContainerElement.innerHTML = '';
  postsContainerElement.appendChild(spinner);

  const response = await fetch(
    `https://openapi.programming-hero.com/api/retro-forum/posts`
  );
  const { posts } = await response.json();

  setTimeout(() => displayAllPost(posts), 2000);
}

// Displaying All Posts
function displayAllPost(posts) {
  postsContainerElement.innerHTML = '';
  posts.forEach((post) => {
    const postBlock = document.createElement('div');
    postBlock.classList = `bg-gray-200 rounded-2xl p-6 md:p-8`;
    postBlock.innerHTML = `
                            <div class="flex flex-col md:flex-row lg:flex-col xl:flex-row gap-7">
                              <div class="relative w-16">
                                <img src="${
                                  post.image || '../media/user.jpg'
                                }" alt="User" class="w-16 rounded-sm" />
                                <div class="${
                                  post.isActive ? 'bg-red-600' : 'bg-green-500'
                                } rounded-full w-5 h-5 -top-2 -right-2 absolute"></div>
                              </div>
                              <div class="grow flex flex-col gap-2">
                                <div class="flex flex-col md:flex-row gap-2 md:gap-6 text-gray-700 mb-3">
                                  <h5>#${post.category}</h5>
                                  <h4>Author: ${post.author?.name}</h4>
                                </div>
                                <h3 class="font-bold text-lg">${post.title}</h3>
                                <p class="text-gray-700">${post.description}</p>
                                <div class="border-t border-dashed border-gray-500 mt-4 flex flex-col md:items-center md:flex-row items-start justify-between py-4 gap-10 md:gap-0">
                                  <div class="flex flex-row md:gap-12 justify-between md:justify-normal gap-4 flex-wrap items-center w-full md:w-auto">
                                    <div class="flex flex-row gap-2 items-center">
                                      <img src="media/icons/message.svg" alt="Message Icon" />
                                      <p>${post.comment_count}</p>
                                    </div>
                                    <div class="flex flex-row gap-2 items-center">
                                      <img src="media/icons/eye.svg" alt="Eye Icon" />
                                      <p id="view">${post.view_count}</p>
                                    </div>
                                    <div class="flex flex-row gap-2 items-center">
                                      <img src="media/icons/clock.svg" alt="Clock Icon" />
                                      <p>${post.posted_time} min</p>
                                    </div>
                                  </div>
                                  <button class="marked-read-btn flex flex-row self-end md:self-auto">
                                    <img
                                      src="media/icons/email.svg"
                                      alt="Email Icon"
                                      class="w-12 md:w-auto"
                                    />
                                  </button>
                                </div>
                              </div>
                            </div>
                          `;
    postsContainerElement.appendChild(postBlock);
  });

  // Marked Button Functionality
  const readMarkedBtnElements = document.querySelectorAll('.marked-read-btn');
  readMarkedBtnElements.forEach((btn) => {
    btn.addEventListener('click', function (event) {
      articleAddMessageElement.classList = 'hidden';
      readCount++;
      const topParent = event.target.parentNode.parentNode.parentNode;
      const title = topParent.querySelector('h3').innerText;
      const viewCount = topParent.querySelector('#view').innerText;

      // Creating Read Marked Element
      const readElement = document.createElement('div');
      readElement.classList = `p-4 bg-white flex flex-col md:flex-row justify-between items-center gap-3 rounded-lg`;
      readElement.innerHTML = `
                                <h3 class="md:w-4/6 font-bold w-full text-lg md:text-base">
                                  ${title}
                                </h3>
                                <div class="flex justify-start md:justify-end items-center w-full md:w-2/6 gap-2">
                                  <img src="media/icons/eye.svg" alt="Eye Icon" />
                                  <p>${viewCount}</p>
                                </div>
                              `;
      markedCardsContainerElement.appendChild(readElement);
      readCountElement.innerText = readCount;
    });
  });
}
