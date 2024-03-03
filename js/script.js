// Selecting Elements
const postsContainerElement = document.getElementById('posts-container');
const LatestPostsContainerElement = document.getElementById(
  'latest-post-container'
);
const markedCardsContainerElement = document.getElementById(
  'marked-cards-container'
);
const readCountElement = document.getElementById('read-count');
const articleAddMessageElement = document.getElementById('add-article-text');
const searchButtonElements = document.querySelectorAll('.search-button');
const largeInputElement = document.querySelector('.search-input');

// Initial Values
let readCount = 0;

// Creating Spinner
const spinner = document.createElement('div');
spinner.classList = `flex flex-col justify-center items-center gap-2 col-span-full mt-3 `;
spinner.innerHTML = ` 
                      <span class="loading loading-spinner text-[#373a81] loading-lg"></span>
                      <p class="text-lg font-bold">Loading, please wait!</p>
                    `;

// Creating Spinner 2
const spinner2 = document.createElement('div');
spinner2.classList = `flex flex-col justify-center items-center gap-2 col-span-full mt-3 `;
spinner2.innerHTML = ` 
                      <span class="loading loading-spinner text-[#373a81] loading-lg"></span>
                      <p class="text-lg font-bold">Loading, please wait!</p>
                    `;

// Sorry Text
const sorryDiv = document.createElement('div');
sorryDiv.classList = `flex justify-center items-center p-12 flex-col gap-1 text-center`;
sorryDiv.innerHTML = `
                      <p class="font-bold text-lg">Sorry Nothing found.</p>
                      <p>Try something else</p>
                      <button id="reset-post" class="mt-3 font-normal bg-[#797DFC] text-white px-4 md:px-6 py-2.5 rounded-2xl hover:bg-[#373a81] duration-200 ease-in">
                      Show All</button>
                    `;

// Initial All Post Fetch and Displaying
fetchAllPostData();

// Initial All Post Fetch and Displaying
fetchLatestPostData();

// All Post Async Function
async function fetchAllPostData(
  link = 'https://openapi.programming-hero.com/api/retro-forum/posts'
) {
  postsContainerElement.innerHTML = '';
  postsContainerElement.appendChild(spinner2);

  const response = await fetch(link);
  const { posts } = await response.json();

  setTimeout(() => displayAllPost(posts), 2000);
}

// Latest Post Async Function
async function fetchLatestPostData() {
  LatestPostsContainerElement.innerHTML = '';
  LatestPostsContainerElement.appendChild(spinner);

  const response = await fetch(
    `https://openapi.programming-hero.com/api/retro-forum/latest-posts`
  );
  const posts = await response.json();

  setTimeout(() => displayLatestPost(posts), 2000);
}

// Displaying All Posts
function displayAllPost(posts) {
  postsContainerElement.innerHTML = '';
  if (!posts.length) {
    postsContainerElement.appendChild(sorryDiv);
    document
      .getElementById('reset-post')
      .addEventListener('click', function () {
        fetchAllPostData();
      });
  }
  posts.forEach((post) => {
    const postBlock = document.createElement('div');
    postBlock.classList = `bg-gray-200 rounded-2xl p-6 md:p-8`;
    postBlock.innerHTML = `
                            <div class="flex flex-col md:flex-row lg:flex-col xl:flex-row gap-7">
                              <div class="relative w-16">
                                <img src="${
                                  post.image || '../media/user.jpg'
                                }" alt="User" class="w-16 rounded-lg" />
                                <div class="${
                                  post.isActive ? 'bg-green-500' : 'bg-red-600'
                                } rounded-full w-5 h-5 -top-2 -right-2 absolute border-spacing-4 border-white border-2"></div>
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
                                  <button class="marked-read-btn flex flex-row self-end md:self-auto outline outline-2 outline-white outline-offset-2 rounded-full hover:outline-green-500 duration-200 ease-out">
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

// Display Latest Posts
function displayLatestPost(posts) {
  LatestPostsContainerElement.innerHTML = ``;
  posts.forEach((post) => {
    const postBlock = document.createElement('div');
    postBlock.classList = `bg-gray-200 rounded-2xl p-6 flex flex-col gap-6`;
    postBlock.innerHTML = `
                            <div class="w-full h-56 md:h-48 overflow-hidden rounded-lg">
                              <img
                                src="${
                                  post.cover_image || 'media/blank-photo.jpg'
                                }"
                                alt="Card Image"
                                class="w-full h-full object-cover"
                              />
                            </div>
                            <div class="flex flex-col gap-2">
                              <div class="flex flex-row items-center gap-3">
                                <img src="media/icons/calender.svg" alt="Calender Icon" />
                                <p>${
                                  post.author?.posted_date || 'No publish date'
                                }</p>
                              </div>
                              <h3 class="font-bold text-lg">
                                ${post.title}
                              </h3>
                              <p class="text-gray-700 min-h-20">
                                ${post.description}
                              </p>
                            </div>
                            <div
                              class="flex flex-col md:flex-row gap-2 md:gap-4 items-start md:items-center"
                            >
                              <img
                                src="${post.profile_image || 'media/user.jpg'}"
                                alt="User"
                                class="w-12 h-12 object-cover rounded-full outline-white outline-double outline-offset-2 "
                              />
                              <div class="flex flex-col gap-0.5">
                                <h5 class="font-bold text-lg">${
                                  post.author?.name || 'Unknown Author'
                                }</h5>
                                <h6 class="font-normal text-base">${
                                  post.author?.designation || 'Unknown'
                                }</h6>
                              </div>
                            </div>
                          `;
    LatestPostsContainerElement.appendChild(postBlock);
  });
}

// Search Funtionality
searchButtonElements.forEach((button) => {
  button.addEventListener('click', function (event) {
    const input = event.target.parentNode.querySelector('input');
    const searchFetchlink = `https://openapi.programming-hero.com/api/retro-forum/posts?category=${input.value.toLowerCase()}`;
    fetchAllPostData(searchFetchlink);
    input.value = '';
  });
});

// Large Screen Input Button work on Enter key press
document.addEventListener('keyup', function (event) {
  if (event.key === 'Enter' && largeInputElement.value) {
    const inputValue = largeInputElement.value;
    const searchFetchlink = `https://openapi.programming-hero.com/api/retro-forum/posts?category=${inputValue.toLowerCase()}`;
    fetchAllPostData(searchFetchlink);
    largeInputElement.value = '';
  }
});
