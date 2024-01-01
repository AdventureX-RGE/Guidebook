# Web开发攻略包

### 介绍

欢迎来到 TreeHacks web 开发攻略包！我们将创建一个名为 TreeYaks 的应用程序，该应用程序允许用户发布内容并对其他人发布的内容进行投票。

### 设置

Windows 用户：通过下载 Ruby 安装程序来安装 Ruby：[http://rubyinstaller.org/](http://rubyinstaller.org/)。

Mac 用户：Ruby 应该已经安装在您的计算机上。

所有平台：下载攻略包后，转到 treeyaks/ 文件夹并输入 `bundle install`。然后，输入 `ruby app.rb`。现在，转到 [http://localhost:4567](http://localhost:4567)。如果您看到 TreeYaks 页面，那么您已经准备好了，一切都安装正确！如果没有，这可能意味着在安装Ruby和/或运行 `bundle install` 时出现了问题。

## TreeYaks

我们将使用一个名为 Sinatra 的框架在 Ruby 中构建 TreeYaks。Sinatra 是用 Ruby 编写的 Web 框架，可帮助您开发 Web 应用程序。如果您以前从未使用过 Ruby，不用担心！我们将在进行的过程中解释语法。但是，如果您想了解更多关于 Ruby 的信息，请查看这些交互式 Ruby 教程：

[https://www.codecademy.com/learn/ruby](https://www.codecademy.com/learn/ruby)

[http://tryruby.org/](http://tryruby.org/)

### 查看所有帖子

我们将首先解决的第一个里程碑是查看所有帖子。在 app.rb 中，有一个名为 `Yak` 的类。Ruby 中的类具有实例变量和方法，就像 Java 或 C++ 中的类一样。每个 `Yak` 对象将代表用户发布的一条Yak。


```
class Yak < ActiveRecord::Base
end
```
让我们在 `get '/'` 方法中将所有的Yaks分配给一个名为 `yaks` 的变量。这将使所有的Yaks都出现在主页上。您可以通过在 `Yak` 类上调用 `all` 方法来获取每个用户发布的所有 Yaks。


```
get '/' do
  # BEGIN YOUR CODE HERE
  
  # Here, you should store all the Yak's in the database in a variable called yaks.
  
  # END YOUR CODE HERE
  
  erb :index, locals: { yaks: yaks }
end
```

应该已经有一行调用 `erb` 函数的代码。`erb` 是一个特殊的函数，用于呈现显示 `yaks` 的 HTML。这就是为什么我们将 `yaks` 变量传递给它的原因 - 它将获取从数据库加载的所有yaks，并将呈现的 HTML 返回给浏览器。它呈现的 HTML 位于 `views/index.erb` 文件中。您不需要编辑此文件，但请随意更改样式以自定义主页的外观和感觉！

### 添加帖子

接下来，让我们让用户添加帖子。您会注意到主页上已经有一个用于 TreeYaks 的 “创建Yak” 链接。然而，目前填写表单实际上什么都不会发生。

在 `post '/new_yak'` 方法中，用户填写的表单的内容已经在 `contents` 变量中。为了完成方法的其余部分，添加代码以创建新的 `Yak`，设置实例变量，并在对象上调用 `save` 方法将其保存到数据库。



```
post '/new_yak' do  
  contents = params['contents']
  
  # BEGIN YOUR CODE HERE
  
  # Here, you should create a new yak, initialize it with the data from the form, and then save it to the database.
  
  # END YOUR CODE HERE
    
  redirect to('/')
end
```

在方法末尾调用的 `redirect_to` 意味着用户发布了新的 Yak 之后，我们将带他们返回到主页 - 这样他们就可以看到他们刚刚发布的 Yak！

现在，您应该能够测试所有内容。转到主页，您应该已经看到一些 Yaks。点击 “创建Yak”，添加一个新的 Yak，然后返回主页。如果您看到刚刚发布的 Yak，那么一切都很顺利！

### 点赞和反对

现在，让我们添加用户点赞或反对 Yaks 的功能。两者的代码将非常相似，因此让我们首先处理点赞。您会注意到每个 Yak 卡片中已经有一些 “点赞” 和 “反对” 的链接。点击 “点赞” 链接将调用 `app.rb` 中的 `post '/upvote'` 方法。



```
post '/upvote' do
  yak_id = params['yak_id']

  # BEGIN YOUR CODE HERE
  
  # In this section, you should increment the yak's upvotes by 1 and return the new number of upvotes in json.
  # (Note: This will be called via AJAX, so you don't need to render any html or redirect to any other page.)
  
  # END YOUR CODE HERE
end
```

`yak_id` 变量是一个包含用户点击赞的 Yak 的 ID 的整数。填写方法的其余部分，该方法应该找到Yak，将其 `upvotes` 数量增加，并将其保存到数据库中。

现在，对于 `downvote`，做类似的事情，只是减少赞的数量而不是增加。这个方法应该看起来与 `post '/upvote'` 方法非常相似。



```
post '/downvote' do
  yak_id = params['yak_id']
  
  # BEGIN YOUR CODE HERE
  
  # In this section, you should decrement the yak's upvotes by 1.   
  # This will be called via AJAX, so you don't need to render any html or redirect to any other page.
  # Hint: You should be able to reuse some code from the '/upvote' method.
  
  # END YOUR CODE HERE
  end
```

### 排序

对于最后一个功能，我们将添加按点赞数量排序Yaks的功能，以便用户可以轻松找到最受欢迎的Yaks。查看 `get '/hot'` 方法。当用户想查看所有Yaks时，将调用此方法，但按点赞数量降序排序。


```
get '/hot' do
  # BEGIN YOUR CODE HERE
  
  # Here, you should use the order method on the Yak class to get all the Yaks ordered by upvotes.
  # The order method takes one parameter, which is the field you want to order by.
  
  # END YOUR CODE HERE
end
```

```
get '/new' do
  # BEGIN YOUR CODE HERE
  
  # Here, you should use the order method on the Yak class to get all the Yaks ordered by it's created_at field.
  # The order method takes one parameter, which is the field you want to order by.
  
  # END YOUR CODE HERE
end
```





