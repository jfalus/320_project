export default function NewItem() {
    return (
        <div class="create-item">
            
        <h1> Create new item </h1>
        <form action="action_page.php">

        <label for="fname">Creator </label>
        <input type="text" id="fname" name="name" placeholder="Your name">
        </input>

        <label for="fname"> Description </label>
        <input type="text" id="fname" name="description" placeholder="Task description">
        </input>

        </form>

        
        </div>
    );
}
