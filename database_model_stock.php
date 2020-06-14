<?php

class Database {

    private static $environment = 1; //1 for dev, 2 godaddy
    public static $connection;
    private static $servername = "";
    private static $username = "";
    private static $password = "";
    private static $database = "";

    function setEnvironment($environment = 2) {
        try {
            if(self::$environment == 1) { //dev
                static::$servername = "127.0.0.1";
                static::$username = "root"; //apgiaa godaddy.com
                self::$password = "password";
                self::$database = "wcc_scheduling"; //apgiaa godaddy.com
            } else if ($environment == 2) { //godaddy
                self::$servername = "localhost";
                self::$username = "sabbaths"; //apgiaa godaddy.com
                self::$password = "Ac2am9jlqwxl)";
                self::$database = "scheduling"; //apgiaa 
            } else { 

            }
        } catch(Exception $e) {

        }
    }
    
    function connectDB() {
        self::setEnvironment();
        $status_code = 900; //901 connected 900 failed

        // Create connection
        $conn = new mysqli(self::$servername, self::$username, self::$password);
        $conn->select_db(self::$database);
        self::$connection = $conn;
        // Check connection
        if ($conn->connect_error) {
            $status_code = 901;
            die("Connection failed: " . $conn->connect_error);
        }
        return $status_code;
    }

    function getStocks() {
        $stocks_arr = array();
        $sql = "SELECT * FROM stocks ORDER BY name;";
        $result = self::$connection->query($sql);   

        if ($result->num_rows > 0) {
            while($row = $result->fetch_assoc()) {
                $id = $row["id"];
                $name = $row["name"];
                $text = $row["text"];
                
                $temp_array = array($id, $name, $text);
                array_push($stocks_arr ,$temp_array);
            }  
        }
        //print_r($courses_arr);
        
        return $stocks_arr;       
    }

    function getStockInfo($stock_id) {
        $stocks_arr = array();
        $sql = "SELECT * FROM stock_info WHERE stock_id = $stock_id;";
        $result = self::$connection->query($sql);   

        if ($result->num_rows > 0) {
            while($row = $result->fetch_assoc()) {
                $stock_info_id = $row["stock_info_id"];
                $stock_id = $row["stock_id"];
                $name = $row["name"];
                $text = $row["text"];
                $shares = $row["shares"];
                $entry = $row["entry"];
                $exit = $row["stock_exit"];
                $be = $row["be"];
                $p1 = $row["p1"];
                $p2 = $row["p2"];
                $p5 = $row["p5"];
                $p10 = $row["p10"];
                $alert_price = $row["alert"];
                
                $temp_array = array($stock_info_id, $stock_id, $name, $text, $shares, $entry, $exit, $be, $p1, $p2, $p5, $p10, $alert_price);
                array_push($stocks_arr ,$temp_array);
            }  
        }
        //print_r($courses_arr);
        
        return $stocks_arr; 
        //return $sql;      
    }

    function addStock($id="", $name, $text="") {
        $sql_insert_student = "INSERT INTO stocks 
                (name, text) 
                VALUES ( 
                '".$name."',
                '".$text."')";



        if (self::$connection->query($sql_insert_student) === TRUE) {
            $stock_id = self::$connection->insert_id;
            self::addStockInfo($stock_id, 0,0,0,0,0,0,0,0,0,0);

            return 7001; //good
        } else {   
            echo self::$connection->error;
            return 7004; //error
        }
    }

    function deleteStock($id) {
        $sql_delete_stock = "DELETE FROM stocks WHERE id = $id";
        $sql_delete_stock_info = "DELETE FROM stock_info WHERE stock_id = $id";

        self::$connection->query($sql_delete_stock_info);

        if (self::$connection->query($sql_delete_stock) === TRUE) {
            return 7001; //good
        } else {   
            echo self::$connection->error;
            return 7002;
            //return $sql_insert_student; //error
        }
    }

    function addStockInfo($stock_id, $bias, $shares,$entry,$exit,$be,$p1,$p2,$p5,$p10,$alert=0) {

        $sql_delete_stock_info = "DELETE FROM stock_info WHERE stock_id = $stock_id";
        $sql_insert_student = "INSERT INTO stock_info 
                (stock_id, name, text, shares, entry, stock_exit, be, p1, p2, p5,p10,alert) 
                VALUES ( 
                '".$stock_id."',
                '"."none"."',
                '".$bias."',
                '".$shares."',
                '".$entry."',
                '".$exit."',
                '".$be."',
                '".$p1."',
                '".$p2."',
                '".$p5."',
                '".$p10."',
                '".$alert."')";

        self::$connection->query($sql_delete_stock_info);

        if (self::$connection->query($sql_insert_student) === TRUE) {
            return 7001; //good
        } else {   
            echo self::$connection->error;
            return 7002;
        }
    }

    function computeStocks($shares = 1000, $entry = 33.6, $exit = 0, $first_loop=false) {
        $commission_charge = .0025;
        $sccp_charge = .0001;
        $vat_charge = .12;
        $pse_fee_charge = .00005;
        $sales_tax_charge = .006;

        $gross = $shares * $entry;
        $commission = $gross * $commission_charge;
        $vat = $commission * $vat_charge;
        $sccp = $gross * $sccp_charge;
        $pse_fee = $gross * $pse_fee_charge;
        $sales_tax = $gross * $sales_tax_charge;

        $total_charges_sell = $commission+$vat+$sccp+$pse_fee+$sales_tax;
        $total_charges_buy = $commission+$vat+$sccp+$pse_fee;
        $net_buy = $gross + $total_charges_buy;
        $net_sell = $gross - $total_charges_sell;
        

        /*
        get entry + .1
        loop 
        check returned percentage
        if not .1 .2 .5 .10 continue

        */
        $percentage = (($net_sell - $net_buy) / $gross) *100;
        if($first_loop==false) {
            for($new_entry=$entry+.1;$new_entry<=$entry*2;$new_entry=$new_entry+.01) {
                $new_net_sell = $this->computeStocks(1000,$new_entry,0, true)[2];
                
                $new_percentage = (($new_net_sell - $net_buy) / $gross);
                $new_percentage = round($new_percentage,3) * 100;
                if($new_percentage == 1 || $new_percentage == 5) {
                echo '<p>' . '' . $new_entry.' '.$gross. ' ' . $new_net_sell . ' ' . $new_percentage;
                }

            }  
        }

        

        return [$entry, $net_buy, $net_sell, $percentage];
    }

    function saveAlertPrice($stock_id, $alert_price) {
        $sql_alert_price = "UPDATE stock_info SET alert = $alert_price WHERE stock_id = $stock_id";


        if (self::$connection->query($sql_alert_price) === TRUE) {
            return 7001; //good
        } else {   
            echo self::$connection->error;
            return 7004; //error
        }
    }

    function getAlertPrice($stock_id) {
        $stocks_arr = array();
        $sql = "SELECT alert FROM stock_info WHERE stock_id = $stock_id;";
        $result = self::$connection->query($sql);   

        if ($result->num_rows > 0) {
            while($row = $result->fetch_assoc()) {
                $id = $row["alert"];
                
                $temp_array = array($id);
                array_push($stocks_arr ,$temp_array);
            }  
        } else {
            $temp_array = array(0);
            array_push($stocks_arr ,$temp_array);
        }
        //print_r($courses_arr);
        
        return $stocks_arr;     
    }

    function getStockCurrentChangePrice($stock_id, $stock_name, $what_price) {
        $stocks_arr = array();
        $sql = "SELECT current_price FROM stock_info WHERE stock_id = $stock_id;";

        if($what_price != 0) {
            $sql = "SELECT change_perc FROM stock_info WHERE stock_id = $stock_id;";
        }


        $result = self::$connection->query($sql);   

        if ($result->num_rows > 0) {
            while($row = $result->fetch_assoc()) {
                $id = 0;
                if($what_price == 0) {
                    $id = $row["current_price"];
                } else {
                    $id = $row["change_perc"];
                }
                
                $temp_array = array($id);
                array_push($stocks_arr ,$temp_array);
            }  
        } else {
            $temp_array = array(0);
            array_push($stocks_arr ,$temp_array);
        }
        //print_r($courses_arr);
        
        return $stocks_arr;     
    }

    function updateStockCurrentPrice($stock_id, $price = 0, $what_price = 0) {

        $sql_update_current_price = " UPDATE stock_info SET current_price = '$price' WHERE stock_id = $stock_id ";
        
        if($what_price != 0) {
            $sql_update_current_price = " UPDATE stock_info SET change_perc = '$price' WHERE stock_id = $stock_id ";
        } 
        
        
        if (self::$connection->query($sql_update_current_price) === TRUE) {
            return $sql_update_current_price; //good
        } else {   
            echo self::$connection->error;
            //return $sql_update_current_price; //error
        }

    }
    
}
