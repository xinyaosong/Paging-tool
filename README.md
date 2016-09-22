# Paging-tool
This paging tool is just for dynamic list, it means your list items should be got by ajax or some other ways.

## How to use

1. Include bootstrap.css( or bootstrap.min.css) ,paging.css, react.js( or react.min.js), react-dom.js( or react-dom.min.js) file in      the <head>.

2. Add <Paging {...props} /> component in the suitable position.
   
    props should include two property and one method:
```
  var props = {
    totalPage: [your data],
    contentLength: [your data],
    getPageContent: [your function],
  }
```
    1) contentLength = 10 means each page should contain 10 list items. 
    
      This data should be consistent with your back-end function where to get the list data.
      
    2) getPageContent is a function to send a request and get the list items on the page your specified. 
    
      The function should have one parameter, which is the start index when you search in the data base.

## Example:
```
  import Paging from [your path of 'paging.js']
  ...
  
  render(){
    return (
      <div>
        <ul>
          <li>...</li>
          ...
        </ul>
        <Paging {..props} />
      </div>
    )
  }
```
